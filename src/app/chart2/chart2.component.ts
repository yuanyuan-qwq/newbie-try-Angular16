import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements AfterViewInit {

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.fetchChartData();
  }

  fetchChartData() {
    this.http.get<any>('assets/data.json').subscribe({
      next: (data) => {
        console.log('Data fetched:', data); // Add this log
        this.renderChart(data);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  renderChart(data: any) {
    const ctx = document.getElementById('myRadarChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: [{
          label: data.label,
          data: data.data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
