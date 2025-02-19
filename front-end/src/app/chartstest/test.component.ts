import { Component, HostListener, ViewChild  } from '@angular/core';
import { SetSimilarity, Couple, JsonResponse} from './types'
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { HttpClient } from '@angular/common/http';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-test',
  imports: [BaseChartDirective],
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

  constructor(private http: HttpClient) {}
  

  /*ngOnInit(): void {
    this.http.get<JsonResponse>('http://127.0.0.1:5000/test')
      .subscribe({
        next: (response) => {
          this.updateChartsData(response);
        },
        error: (err) => {
          alert(`${err.message}`);
        },
        complete: () => {
          if (this.scatterChart) {
            this.scatterChart.chart?.update();
          }
          if (this.barChart) {
            this.barChart.chart?.update();
          }
        }
      });
  }*/ 

    ngOnInit(): void {
        this.generateMockData();
      }

      generateMockData(): void {
        this.average = Math.random();
        this.deviation = Math.random() * 0.5;
      
        const mockScatterData: Couple[] = Array.from({ length: 30 }, (_, index) => ({
          question: `Question ${index + 1}`,
          trueAnswer: `Answer ${index + 1}`,
          generatedAnswer: `Generated ${index + 1}`,
          similarity: Math.random()
        }));
      
        const mockSetSimilarity: SetSimilarity[] = Array.from({ length: 5 }, (_, index) => {
          const lower = index * 0.2;
          const upper = lower + 0.2;
          return {
            lower_bound: lower, 
            upper_bound: upper,  
            elements_in_class: Math.floor(Math.random() * 20)
          };
        });
      
        this.class_names = mockSetSimilarity.map(item => `${item.lower_bound} - ${item.upper_bound}`);
      
        this.chartData_1.datasets[0].data = mockScatterData.map((item, index) => ({ x: index + 1, y: item.similarity }));
        
        this.chartData_2.labels = this.class_names;
        this.chartData_2.datasets[0].data = mockSetSimilarity.map(item => item.elements_in_class);
      
        this.loading = false;
      
        this.scatterChart?.chart?.update();
        this.barChart?.chart?.update();
      }
      
      chartClicked(event: { event?: ChartEvent, active?: any[] }): void {
        if (event.active && event.active.length > 0) {
          const chartElement = event.active[0];
          const datasetIndex = chartElement.datasetIndex;
          const index = chartElement.index;
          const datasetLabel = this.chartData_1.datasets[datasetIndex].label;
          const dataValue = this.chartData_1.datasets[datasetIndex].data[index];
          
          alert(`Dataset: ${datasetLabel}\nIndex: ${index}\nValue: ${JSON.stringify(dataValue)}`);
        }
      }
      
      
  updateChartsData(json:JsonResponse): void {
    this.average = json.average;
    this.deviation = json.deviation;
    const sets_similarity:SetSimilarity[] = json.sets_similarity;
    const jsonData:Couple[] = json.couples;
    this.class_names = sets_similarity.map((item) => (`${item.lower_bound} - ${item.upper_bound}`));
    this.chartData_2.labels = this.class_names;
    this.chartData_1.datasets[0].data = jsonData.map((item, index) => ({x:index+1, y:item.similarity}));
    this.chartData_2.datasets[0].data = sets_similarity.map((item) => item.elements_in_class);
    this.loading = false;
  }
}