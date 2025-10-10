import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  /** Показывать плавную анимацию заполнения */
  @Input() animate: boolean = false;

  /** Пульсация фона */
  @Input() pulse: boolean = false;

  /** Градиентное движение */
  @Input() gradient: boolean = false;

  /** Включить анимацию появления при монтировании */
  @Input() fadeInOnInit: boolean = false;

  /** Длительность анимации появления в миллисекундах */
  @Input() fadeInDuration: number = 0;

  /** Текущее значение прогресса */
  @Input() value: number = 0;

  /** Максимальное значение прогресса */
  @Input() max: number = 0;

  /** Цвет заполненной части */
  @Input() color: string = '';

  /** Цвет фона полосы */
  @Input() backgroundColor: string = '';

  /** Высота полосы */
  @Input() height: string = '';

  /** Закругление углов */
  @Input() borderRadius: string = '';

  /** Показывать текст прогресса */
  @Input() showLabel: boolean = false;

  /** Формат текста, если showLabel = true */
  @Input() labelTemplate: 'percent' | 'fraction' | 'custom' = 'percent';

  /** Пользовательский текст, если labelTemplate = 'custom' */
  @Input() customLabel: string = '';

  /** Локальное значение для анимации появления */
  progressValue: number = 0;

  /** Флаг для CSS-класса fade-in */
  fadeInActive: boolean = false;

  ngOnInit() {
    if (this.fadeInOnInit) {
      this.progressValue = 0;
      setTimeout(() => {
        this.fadeInActive = true;
        this.progressValue = this.value;
      }, 50);
    } else {
      this.progressValue = this.value;
    }
  }

  getProgress(): number {
    return Math.min(Math.max((this.progressValue / this.max) * 100, 0), 100);
  }

  getLabel(): string {
    switch (this.labelTemplate) {
      case 'percent': return `${Math.round(this.getProgress())}%`;
      case 'fraction': return `${this.value} / ${this.max}`;
      case 'custom': return this.customLabel;
      default: return '';
    }
  }

  getWrapperStyles() {
    return {
      backgroundColor: this.backgroundColor,
      borderRadius: this.borderRadius,
      height: this.height,
      overflow: 'hidden',
      width: '100%',
    };
  }

  getBarStyles() {
    return {
      width: `${this.getProgress()}%`,
      backgroundColor: this.color,
      height: '100%',
      borderRadius: this.borderRadius,
      transition: this.animate ? `width 0.4s ease, opacity ${this.fadeInDuration}ms ease` : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: '600',
      fontSize: '0.9rem',
      opacity: this.fadeInOnInit ? (this.fadeInActive ? 1 : 0) : 1,
    };
  }
}
