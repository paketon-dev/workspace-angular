import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';


interface MenuItem {
  label: string;
  icon: string | SafeHtml;
  active: boolean;
  router: string;
  badge?: string;
  customClasses?: any;
  customStyles?: any;
}

export interface SidebarResponsiveConfig {
  breakpoints: {
    mobile: number;   // до этой ширины — мобильная версия
    tablet: number;   // до этой ширины — планшетная версия
    desktop: number;  // до этой ширины — десктопная версия
  };
  widths: {
    mobile: string;   // ширина боковой панели для мобильных
    tablet: string;   // ширина для планшетов
    desktop: string;  // ширина для ПК
  };
}

/**
 * Компонент боковой панели (Sidebar) с поддержкой адаптивного поведения.
 * 
 * Используется для отображения меню с иконками, бейджами, кнопкой сворачивания,
 * логотипом и кастомными стилями. Адаптивен для мобильных, планшетов и десктопов.
 * 
 * Пример использования:
 * ```html
 * <lib-sidebar
 *   [menu]="menuItems"
 *   [logoUrl]="'assets/logo.png'"
 *   [customClasses]="customClasses"
 *   [customStyles]="customStyles"
 *   [responsiveConfig]="responsiveConfig"
 *   (collapsedChange)="onCollapsedChange($event)">
 * </lib-sidebar>
 * ```
 */

@Component({
  selector: 'lib-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  /**
 * Массив элементов меню для sidebar.
 * Каждый элемент содержит label, icon, router, badge и кастомные стили/классы.
 */
  @Input() menu: MenuItem[] = [];

  /**
   * Флаг свёрнутости sidebar.
   * На мобильных устройствах может меняться автоматически.
   */
  @Input() isCollapsed: boolean = false;

  /**
   * URL логотипа, отображаемого в заголовке sidebar
   */
  @Input() logoUrl: string = 'logo.png';

  /**
   * Кастомные CSS-классы для элементов sidebar (sidebar, header, toggleButton и т.д.)
   */
  @Input() customClasses: any = {};

  /**
   * Кастомные CSS-стили для элементов sidebar (sidebar, header, toggleButton и т.д.)
   */
  @Input() customStyles: any = {};

  /**
   * Конфигурация адаптивности sidebar
   */
  @Input() responsiveConfig: SidebarResponsiveConfig = {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    },
    widths: {
      mobile: '0px',
      tablet: '65px',
      desktop: '200px'
    }
  };

  /**
   * Событие, генерируемое при изменении состояния свёрнутости sidebar
   */
  @Output() collapsedChange = new EventEmitter<boolean>();

  currentWidth: string = this.responsiveConfig.widths.desktop;
  isMiniSidebar: boolean = false;

  constructor() {
    const screenWidth = window.innerWidth;
    const { mobile, tablet, desktop } = this.responsiveConfig.breakpoints;

    if (screenWidth <= mobile) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }

    this.updateSidebarWidth();
  }


  getSidebarStyles() {
    return {
      width: this.currentWidth,
      ...(this.customStyles.sidebar || {})
    };
  }

  getToggleButtonStyles() {

    const widthValue = parseInt(this.currentWidth, 10);
    const leftValue = widthValue + 10;

    return {
      ...this.customStyles.toggleButton,
      left: `${leftValue}px`,
      position: 'absolute',
      top: '20px',
    };
  }


  get toggleButtonClasses() {
    const screenWidth = window.innerWidth;
    const { mobile } = this.responsiveConfig.breakpoints;

    if (screenWidth <= mobile) {
      return {
        'active': !this.isCollapsed,
        ...(this.customClasses.toggleButton || {})
      };
    } else {

      return {
        'active': this.isCollapsed,
        ...(this.customClasses.toggleButton || {})
      };
    }
  }


  @HostListener('window:resize')
  onResize() {
    this.updateSidebarWidth();
  }

  updateSidebarWidth() {
    const screenWidth = window.innerWidth;
    const { mobile, tablet, desktop } = this.responsiveConfig.breakpoints;
    const { mobile: mobileW, tablet: tabletW, desktop: desktopW } = this.responsiveConfig.widths;

    if (screenWidth <= mobile) {
      this.currentWidth = this.isCollapsed ? mobileW : '200px';
    } else if (screenWidth <= tablet) {
      this.currentWidth = this.isCollapsed ? '200px' : tabletW;
    } else {
      if (!this.currentWidth || this.currentWidth === '0px') {
        this.currentWidth = desktopW;
      }
    }
    const widthValue = parseInt(this.currentWidth);
    this.isMiniSidebar = widthValue < 150;
  }


  get isDesktop(): boolean {
    return window.innerWidth > 768;
  }

  toggleCollapse() {
    const screenWidth = window.innerWidth;

    if (this.isDesktop) {
      this.currentWidth = this.currentWidth === this.responsiveConfig.widths.desktop ? '65px' : this.responsiveConfig.widths.desktop;
    } else {
      this.isCollapsed = !this.isCollapsed;
      this.updateSidebarWidth();
    }

    this.collapsedChange.emit(this.isCollapsed);
  }


  getItemClasses(item: MenuItem) {
    return {
      'menu-item': true,
      ...item.customClasses
    };
  }

  getItemStyles(item: MenuItem) {
    return {
      ...item.customStyles
    };
  }
}