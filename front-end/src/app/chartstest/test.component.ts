import { Component, HostListener, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetSimilarity, Couple, JsonResponse} from './types'
import { NavigationService, NavLink } from '../navigation/navigation.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { HttpClient } from '@angular/common/http';
import zoomPlugin from 'chartjs-plugin-zoom';


Chart.register(zoomPlugin);

@Component({
  selector: 'app-test',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  public loading = true;
  public average:number = 0.0;
  public deviation:number = 0.0;
  public class_names:string[] = [];
  public barChartType = 'bar' as const;
  public scatterChartType: ChartType = 'scatter';
  public mockScatterData: Couple[] = [];
  public couples: Couple[] = [];

  public chartData_1: ChartData<'scatter'> = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Similarity',
        data: [] as { x: number, y: number, backgroundColor: string }[],  // Add backgroundColor here
        pointRadius: 5
      }
    ]
  };

  public chartData_2: ChartData<'bar'> = {
    labels: this.class_names,
    datasets: [
      {
        label: 'Similarity',
        data: [] as number[],   
      }
    ]
  };

  public chartOptions_1: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        }
      }
    },
    scales: {
      x: {
        type:'linear',
        title: {
          display: true,
          text: 'Questions'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Similarity'
        }
      }
    }
  };

  public chartOptions_2: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Classes'
        },

          max : 5,
          min : 0,

      },
      y: {
        title: {
          display: true,
          text: 'Similarity'
        },
        max : 30,
        min : 0,
      }
    }
  };

  @ViewChild('scatterChart') scatterChart: BaseChartDirective | undefined;
  @ViewChild('barChart') barChart: BaseChartDirective | undefined;

  constructor(private http: HttpClient, private navigationService: NavigationService) {}
  

  ngOnInit(): void {
    this.setHeader();
    this.loading = true;
    this.http.get<JsonResponse>('http://127.0.0.1:5000/test')
      .subscribe({
        next: (response) => {
          if (response) {
            try {
              console.log(response);
              sessionStorage.setItem('jsonResponse', JSON.stringify(response));
              this.updateChartsData(response);
            } catch (err) {
              alert(err);
            }
          }
        },
        error: (err) => {
          alert(`Error: ${err.message}`);
        },
        complete: () => {
          this.loading = false;
          if (this.scatterChart) {
            this.scatterChart?.chart?.update();
          }
          if (this.barChart) {
            this.barChart?.chart?.update();
          }
        }
      });
  }

  setHeader(): void{
    const links:NavLink[] = [
      { path: '/', label: 'Vai alla pagina del home' },
      { path: '/form', label: 'Vai alla pagina del form' },
      { path: '/list', label: 'Vai alla pagina della lista' },
    ];
    const pageName = "Test";
    this.navigationService.updateNavLinks(links, pageName);
  }

  chartClicked(event: { event?: ChartEvent, active?: any[] }): void {
    if (event.active && event.active.length > 0) {
      const chartElement = event.active[0];
      const datasetIndex = chartElement.datasetIndex;
      const index = chartElement.index;
      const datasetLabel = this.chartData_1.datasets[datasetIndex].label;
      const dataValue = this.chartData_1.datasets[datasetIndex].data[index];  
      const jsonResponseStr  = sessionStorage.getItem('jsonResponse');
    
      if (jsonResponseStr) {
        try {
          const jsonResponse: JsonResponse = JSON.parse(jsonResponseStr);
          const couple = jsonResponse.couples[index];
          if (couple) {
            alert(
              `Dataset: ${datasetLabel}\nIndex: ${index}\nValue: ${JSON.stringify(dataValue)}\n\n` +
              `Domanda: ${couple.question}\nTrue Answer: ${couple.trueAnswer}\nGenerated Answer: ${couple.generatedAnswer}`
            );
          } else {
            alert(
              `Dataset: ${datasetLabel}\nIndex: ${index}\nValue: ${JSON.stringify(dataValue)}\n\n` +
              `Nessuna informazione associata trovata per questo indice.`
            );
          }
        } catch (error) {
          alert(`Errore durante il parsing del JSON salvato in sessione: ${error}`);
        }
      } else {
        alert("Nessun dato JSON trovato in sessione.");
      }
    }
  }

  updateChartsData(json: JsonResponse): void {
    this.average = json.average;
    this.deviation = json.deviation;
    this.couples = json.couples;
  
    const newScatterData = json.couples.map((item, index) => ({ x: index + 1, y: item.similarity }));
    const newHistogramData = json.sets_similarity.map((item) => item.elements_in_class);
    const class_names = json.sets_similarity.map((item) => (`${item.lower_bound} - ${item.upper_bound}`));
  
    const destroyChart = (chart: BaseChartDirective | undefined) => {
      if (chart?.chart) {
        chart.chart.destroy();
        (chart as any).chart = null;
      }
    };
    destroyChart(this.scatterChart);
    destroyChart(this.barChart);
  
    this.chartData_1 = {
      datasets: [{
        ...this.chartData_1.datasets[0],
        data: newScatterData,
        label: 'Similarity',
        pointRadius: 5
      }],
      labels: []
    };

  
    this.chartData_2 = {
      labels: class_names,
      datasets: [{
        ...this.chartData_2.datasets[0],
        data: newHistogramData,
        label: 'Similarity'
      }]
    };
  
    setTimeout(() => {
      this.scatterChart?.chart?.render();
      this.barChart?.chart?.render();
    });
  }

  getSimilarityColor(value: number): string {
    const red = Math.round((1 - value) * 255);
    const green = Math.round(value * 255);
    return `rgb(${red}, ${green}, 0)`;
  }
}