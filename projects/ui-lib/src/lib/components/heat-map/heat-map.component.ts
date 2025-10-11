import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface HeatMapData {
  labelX: string; 
  values: number[]; 
}

@Component({
  selector: 'lib-heat-map',
  imports: [CommonModule],
  templateUrl: './heat-map.component.html',
  styleUrl: './heat-map.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class HeatMapComponent  implements OnChanges {
  /** Подписи оси X (например: часы) */
  @Input() labelsX: string[] = [];

  /** Подписи оси Y (например: дни недели) */
  @Input() labelsY: string[] = [];

  /** Данные: массив строк по Y, каждая строка содержит значения по X */
  @Input() data: number[][] = [];

  /** Цветовая палитра: от минимального к максимальному */
  @Input() colors: string[] = ['#e5e7eb', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'];

  /** Максимальное значение для нормализации */
  maxValue: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data?.length) {
      const flat = this.data.flat();
      this.maxValue = Math.max(...flat, 1);
    }
  }

  /** Возвращает цвет ячейки в зависимости от значения */
  getCellColor(value: number): string {
    const ratio = value / this.maxValue;
    const index = Math.floor(ratio * (this.colors.length - 1));
    return this.colors[index];
  }
}