import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

export interface ChartDataSet {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}


@Component({
  selector: 'lib-chart',
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnChanges, AfterViewInit {

  @ViewChild('chartCanvas', { static: true }) canvas: any;

  /** Тип графика: 'line', 'bar', 'pie', 'doughnut' */
  @Input() type: ChartType = 'line';

  /** Данные графика */
  @Input() data: ChartData = { labels: [], datasets: [] };

  /** Опции Chart.js */
  @Input() options: ChartConfiguration['options'] = {
    responsive: true,
    animation: { duration: 500, easing: 'easeOutQuart' },
    plugins: { legend: { position: 'top' } }
  };

  chart!: Chart;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && changes['data'] && !changes['data'].firstChange) {
      this.updateChart();
    }
  }

  private initChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }

  private updateChart() {
    this.chart.data = this.data;
    this.chart.update('active');
  }

}
