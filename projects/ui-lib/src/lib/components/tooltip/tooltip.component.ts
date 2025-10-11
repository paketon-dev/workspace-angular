import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class TooltipComponent {
  /** Текст или HTML контент для тултипа */
  @Input() content: string = 'Подсказка';

  /** Позиция тултипа */
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Задержка перед появлением */
  @Input() showDelay: number = 300;

  /** Задержка перед скрытием */
  @Input() hideDelay: number = 200;

  /** Максимальная ширина */
  @Input() maxWidth: string = '220px';

  /** Флаг видимости */
  visible = false;

  private showTimeout?: any;
  private hideTimeout?: any;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => (this.visible = true), this.showDelay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => (this.visible = false), this.hideDelay);
  }

  /** Класс для позиционирования */
  getPositionClass() {
    return `tooltip-${this.position}`;
  }
}