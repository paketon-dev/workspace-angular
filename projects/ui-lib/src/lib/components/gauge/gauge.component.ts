import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'lib-gauge',
  imports: [CommonModule],
  templateUrl: './gauge.component.html',
  styleUrl: './gauge.component.css'
})
export class GaugeComponent {

  /** Текущее значение */
  @Input() value: number = 50;

  /** Минимальное значение */
  @Input() min: number = 0;

  /** Максимальное значение */
  @Input() max: number = 100;

  /** Цвет заполненной части */
  @Input() color: string = '#16a34a';

  /** Цвет фона */
  @Input() backgroundColor: string = '#e5e7eb';

  /** Размер индикатора */
  @Input() size: number = 150;

  /** Толщина линии */
  @Input() strokeWidth: number = 15;

  /** Плавная анимация */
  @Input() animate: boolean = true;

  /** Текущее значение для анимации */
  displayedValue: number = 0;

  /** Радиус круга */
  radius: number = 0;

  /** Длина окружности */
  circumference: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.radius = (this.size - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;

    if (this.animate) {
      const step = () => {
        if (Math.abs(this.displayedValue - this.value) < 0.5) {
          this.displayedValue = this.value;
        } else {
          this.displayedValue += (this.value - this.displayedValue) * 0.1;
          requestAnimationFrame(step);
        }
      };
      step();
    } else {
      this.displayedValue = this.value;
    }
  }

  ngOnInit() {
    this.radius = (this.size - this.strokeWidth) / 2;
    this.circumference = 2 * Math.PI * this.radius;
    this.updateValue();
  }

  private updateValue() {
    if (this.animate) {
      const step = () => {
        if (Math.abs(this.displayedValue - this.value) < 0.5) {
          this.displayedValue = this.value;
        } else {
          this.displayedValue += (this.value - this.displayedValue) * 0.1;
          requestAnimationFrame(step);
        }
      };
      step();
    } else {
      this.displayedValue = this.value;
    }
  }

  getStrokeDashOffset(): number {
    const percent = (this.displayedValue - this.min) / (this.max - this.min);
    return this.circumference * (1 - percent);
  }

  getPercent(): number {
    return Math.round(((this.displayedValue - this.min) / (this.max - this.min)) * 100);
  }
}
