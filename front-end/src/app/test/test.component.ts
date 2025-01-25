import { Component, HostListener, ViewChild  } from '@angular/core';
import { SetSimilarity, Couple, JsonResponse} from './types'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { HttpClient } from '@angular/common/http';

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

  public chartData_1: ChartData<'scatter'> = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Similarity',
        data: [] as { x: number, y: number }[],  
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
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Questions'
        },
        afterDataLimits: (scale) => {
          scale.max = 30;
          scale.min = 1;
        }
      },
      y: {
        title: {
          display: true,
          text: 'Similarity'
        },
        afterDataLimits: (scale) => {
          scale.max = 1;
          scale.min = 0;
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

  ngOnInit(): void {
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