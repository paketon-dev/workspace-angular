import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Элемент горизонтального меню
 */
export interface HorizontalMenuItem {
  /** Текст пункта меню */
  label: string;

  /** Иконка (текстовая или SVG) */
  icon?: string | SafeHtml;

  /** Ссылка для маршрутизации */
  router: string;

  /** Дополнительный бейдж (например, количество уведомлений) */
  badge?: string;

  /** Кастомные CSS-классы для конкретного элемента */
  customClasses?: Partial<NavBarItemClasses>;

  /** Кастомные inline-стили для конкретного элемента */
  customStyles?: Partial<NavBarItemStyles>;
}

/**
 * CSS-классы для элементов навбара
 */
export interface NavBarClasses {
  /** Основной контейнер меню */
  container: string;

  /** Элемент меню */
  item: string;

  /** Активный пункт */
  active: string;

  /** Обертка меню (при необходимости) */
  menuWrapper?: string;

  /** Кнопка сворачивания меню (бургер) */
  toggleButton?: string;
}

/**
 * Inline-стили для элементов навбара
 */
export interface NavBarStyles {
  /** Стили контейнера */
  container?: Record<string, string>;

  /** Стили отдельного пункта меню */
  item?: Record<string, string>;

  /** Стили обертки меню */
  menuWrapper?: Record<string, string>;

  /** Стили кнопки сворачивания */
  toggleButton?: Record<string, string>;
}

/**
 * Классы для отдельного пункта меню
 */
export interface NavBarItemClasses {
  item?: string;
  active?: string;
}

/**
 * Inline-стили для отдельного пункта меню
 */
export interface NavBarItemStyles {
  item?: Record<string, string>;
}


@Component({
  selector: 'lib-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  /**
   * Элементы меню (текст, иконка, маршрут, бейдж и т.п.)
   */
  @Input() menu: HorizontalMenuItem[] = [];

  /**
   * Свёрнутое состояние меню (например, для мобильной версии)
   */
  @Input() isCollapsed: boolean = false;

  /**
   * Кастомные CSS-классы для элементов меню
   */
  @Input() customClasses: Partial<NavBarClasses> = {};

  /**
   * Кастомные inline-стили для элементов меню
   */
  @Input() customStyles: Partial<NavBarStyles> = {};

  /**
   * Событие изменения состояния (свёрнуто/развёрнуто)
   */
  @Output() collapsedChange = new EventEmitter<boolean>();

  /** Флаг мобильного режима */
  isMobile: boolean = false;

  constructor() {
    this.updateScreenSize();
  }

  /** Отслеживает изменение ширины окна */
  @HostListener('window:resize')
  updateScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isCollapsed = false;
    }
  }

  /** Переключение состояния меню (бургер) */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  /** Получить стили контейнера меню */
  getMenuStyles(): Record<string, string> {
    return { ...(this.customStyles.menuWrapper || {}) };
  }

  /** Получить классы для конкретного пункта меню */
  getItemClasses(item: HorizontalMenuItem): Record<string, boolean | string> {
    return {
      [this.customClasses.item || '']: true,
      ...(item.customClasses || {})
    };
  }

  /** Получить inline-стили для конкретного пункта */
  getItemStyles(item: HorizontalMenuItem): Record<string, string> {
    return {
      ...(this.customStyles.item || {}),
      ...(item.customStyles?.item || {})
    };
  }
}
