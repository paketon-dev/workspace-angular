import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { ToastMessage, ToastClasses, ToastStyles, ToastType } from './toast.model';

@Component({
  selector: 'lib-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  toasts: ToastMessage[] = [];

  /** Кастомные CSS-классы */
  @Input() customClasses: Partial<ToastClasses> = {};

  /** Кастомные inline-стили */
  @Input() customStyles: Partial<ToastStyles> = {};

  /** Позиция уведомлений */
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe(list => this.toasts = list);
  }

  /** Закрыть уведомление вручную */
  closeToast(toast: ToastMessage) {
    if (toast.id) this.toastService.remove(toast.id);
  }

  /** Цвет по типу */
  getToastColor(type?: ToastType): string {
    switch (type) {
      case 'success': return '#16a34a';
      case 'error': return '#dc2626';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#374151';
    }
  }

  /** Иконка по типу */
  getDefaultIcon(type?: ToastType): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  }

  /** Стили контейнера с поддержкой позиции */
  getContainerStyles() {
    const posStyles = this.getPositionStyles();
    return {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: '9999',
      padding: '10px',
      ...posStyles,
      ...(this.customStyles.container || {})
    };
  }

  /** Стили одного уведомления */
  getToastStyles(toast: ToastMessage) {
    return {
      background: '#fff',
      color: '#111',
      borderLeft: `4px solid ${this.getToastColor(toast.type)}`,
      borderRadius: '8px',
      padding: '10px 14px',
      minWidth: '260px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...(this.customStyles.toast || {})
    };
  }

  /** Позиционирование контейнера */
  private getPositionStyles() {
    switch (this.position) {
      case 'top-left': return { top: '10px', left: '10px' };
      case 'top-right': return { top: '10px', right: '10px' };
      case 'bottom-left': return { bottom: '10px', left: '10px' };
      case 'bottom-right': return { bottom: '10px', right: '10px' };
      default: return { top: '10px', right: '10px' };
    }
  }
}
