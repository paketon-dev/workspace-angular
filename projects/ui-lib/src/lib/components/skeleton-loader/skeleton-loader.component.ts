import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-skeleton-loader',
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
  /** Количество блоков скелетона */
  @Input() count: number = 3;

  /** Высота блока */
  @Input() height: string = '20px';

  /** Ширина блока (можно % или px) */
  @Input() width: string = '100%';

  /** Скругление углов */
  @Input() borderRadius: string = '4px';
}
