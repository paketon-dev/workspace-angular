import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

export interface TimelineEvent {
  date?: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'lib-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  animations: [
    trigger('fadeStagger', [
      transition(':enter', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(120, animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ])
      ])
    ])
  ]
})
export class TimelineComponent {
  /** Список событий */
  @Input() events: TimelineEvent[] = [];

  /** Вертикальная или горизонтальная ориентация */
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';

  /** Цвет линии по умолчанию */
  @Input() lineColor: string = '#d1d5db';
}
