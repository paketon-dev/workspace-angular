import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


/**
 * Модель кнопки модального окна
 */
export interface ModalButton {
  /** Текст кнопки */
  label: string;

  /** Цвет кнопки (primary, secondary, danger, custom HEX/RGB) */
  color?: 'primary' | 'secondary' | 'danger' | string;

  /** Действие при нажатии */
  action: () => void;

  /** Неактивна ли кнопка */
  disabled?: boolean;

  /** Кастомные CSS-классы */
  customClass?: string;

  textColor?: string;
  /** Tooltip или подсказка */
  tooltip?: string;

  /** Иконка (эмодзи, SVG или HTML) */
  icon?: string;

  isPrimary?: true
}

/**
 * Классы CSS для модального окна
 */
export interface ModalClasses {
  overlay?: string;
  container?: string;
  header?: string;
  body?: string;
  footer?: string;
  closeButton?: string;
  button?: string;
}

/**
 * Inline-стили для модального окна
 */
export interface ModalStyles {
  overlay?: Record<string, string>;
  container?: Record<string, string>;
  header?: Record<string, string>;
  body?: Record<string, string>;
  footer?: Record<string, string>;
}


@Component({
  selector: 'lib-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  /** Заголовок модального окна */
  @Input() title: string = '';

  /** Состояние — открыта ли модалка */
  @Input() isOpen: boolean = true;

  /** Контент модалки (HTML или текст) */
  @Input() bodyText: string = '';

  /** Массив кнопок в нижней панели */
  @Input() buttons: ModalButton[] = [];

  /** Кастомные CSS-классы */
  @Input() customClasses: Partial<ModalClasses> = {};

  /** Кастомные inline-стили */
  @Input() customStyles: Partial<ModalStyles> = {};

  /** Можно ли закрыть по клику на фон */
  @Input() closeOnOverlayClick: boolean = true;

  /** Событие при открытии окна */
  @Output() opened = new EventEmitter<void>();

  /** Событие при закрытии окна */
  @Output() closed = new EventEmitter<void>();

  /** Открыть окно */
  open(): void {
    this.isOpen = true;
    this.opened.emit();
  }

  /** Закрыть окно */
  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  /** Клик по фону */
  onOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlayClick && (event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  /** Получить стиль кнопки по типу */
  getButtonStyle(button: ModalButton): Record<string, string> {
    let background = '#e5e7eb';
    let color = '#111827';

    switch (button.color) {
      case 'primary':
        background = '#16a34a';
        color = '#fff';
        break;
      case 'secondary':
        background = '#3b82f6';
        color = '#fff';
        break;
      case 'danger':
        background = '#ef4444';
        color = '#fff';
        break;
      default:
        if (button.color && button.color.startsWith('#')) {
          background = button.color;
          color = '#fff';
        }
        break;
    }

    return {
      background,
      color,
      border: 'none',
      padding: '0.5rem 1.2rem',
      borderRadius: '8px',
      fontWeight: '500',
      cursor: button.disabled ? 'not-allowed' : 'pointer',
      opacity: button.disabled ? '0.6' : '1',
      transition: 'all 0.2s ease'
    };
  }

}
