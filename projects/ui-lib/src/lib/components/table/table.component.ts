import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateFilterSortComponent } from '../fields/date-filter/date-filter.component';
import { NumberFilterComponent } from '../fields/number-filter/number-filter.component';
import { SearchFilterSortComponent } from '../fields/search-filter-sort/search-filter-sort.component';
import { UuidSearchFilterSortComponent } from '../fields/uuid-search-filter-sort/uuid-search-filter-sort.component';
import { formatShortDate } from '../../utils/date.utils';

export interface TableAction {
  label: string;
  icon?: string;
  action: (product: any) => void;
}

export interface ColumnConfig {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'uuid' | 'enam';
  isFilter: boolean;
  endpoint: string;
  field: string;
}

export interface FilterDto {
  field: string;
  values: any[];
  type: number;
}

export interface SortDto {
  field: string;
  sortType: number;
}

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    DateFilterSortComponent, NumberFilterComponent, SearchFilterSortComponent, UuidSearchFilterSortComponent
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  /**
   * Массив объектов, которые будут отображаться в таблице.
   * Каждое значение соответствует одной строке таблицы.
   */
  @Input() products: any[] = [];

  /**
   * Конфигурация отображаемых колонок.
   * Ключ — ключ поля, значение — показывать колонку или нет.
   * Пример: { fullName: true, retailPrice: false }
   */
  @Input() columnsConfig: { [key: string]: boolean } = {};

  /**
   * Настройки всех колонок таблицы.
   * Используется для динамического отображения колонок и фильтров.
   */
  @Input() columnOptions: ColumnConfig[] = [];

  /**
   * Количество элементов на странице для пагинации или подгрузки.
   */
  @Input() pageSize: number = 30;

  /**
   * Флаг, показывающий, что идет загрузка данных.
   * Используется для отображения индикатора загрузки.
   */
  @Input() loading: boolean = false;

  /**
   * Флаг, показывающий текущий тип отображения таблицы.
   * true — десктопная таблица, false — мобильные карточки.
   */
  @Input() isDesktop: boolean = true;

  /**
   * Домен или контекст, используемый для построения ссылок или API-запросов.
   */
  @Input() domain: string = '';

  /**
   * Массив действий для каждой строки таблицы.
   * Каждое действие имеет label, icon (необязательно) и callback function.
   */
  @Input() actions: TableAction[] = [];

  /**
   * Внутренний объект состояния видимости колонок.
   */
  columns: { [key: string]: boolean } = {};

  /**
   * Массив выбранных колонок для отображения.
   */
  selectedColumns: string[] = [];

  /**
   * Флаг, показывающий, открыт ли список выбора колонок.
   */
  columnsVisible = false;

  /**
   * Текущая страница для подгрузки данных.
   */
  page = 0;

  /**
   * Событие на редактирование строки. Эмиттит id продукта.
   */
  @Output() edit = new EventEmitter<string>();

  /**
   * Событие на удаление строки. Эмиттит id продукта.
   */
  @Output() delete = new EventEmitter<string>();

  /**
   * Событие для подгрузки следующей страницы данных.
   * Эмиттит объект с номером страницы и размером страницы.
   */
  @Output() loadNextPage = new EventEmitter<{ page: number, pageSize: number }>();

  /**
   * Событие при изменении фильтра.
   * Эмиттит объект FilterDto с полем, значениями и типом фильтра.
   */
  @Output() filterChange = new EventEmitter<FilterDto>();

  /**
   * Событие при изменении сортировки.
   * Эмиттит объект SortDto с полем и типом сортировки.
   */
  @Output() sortChange = new EventEmitter<SortDto>();


  ngOnInit(): void {
    this.initializeColumns();
    this.updateScreenSize();
  }

  private initializeColumns() {
    this.selectedColumns = Object.keys(this.columnsConfig).filter(key => this.columnsConfig[key]);
  }

  get filteredSelectedColumns(): string[] {
    return this.selectedColumns.filter(col => col !== 'article');
  }

  formatShortDate(date: string): string {
    return formatShortDate(date);
  }

  toggleColVisibility() {
    this.columnsVisible = !this.columnsVisible;
  }

  toggleColumnVisibility(columnKey: string, value: boolean) {
    this.columnsConfig[columnKey] = value;
    this.selectedColumns = Object.keys(this.columnsConfig).filter(key => this.columnsConfig[key]);
  }

  removeColumn(columnKey: string) {
    this.selectedColumns = this.selectedColumns.filter(col => col !== columnKey);
    this.columnsConfig[columnKey] = false;
  }

  editProduct(id: string) {
    this.edit.emit(id);
  }

  deleteProduct(id: string) {
    this.delete.emit(id);
  }

  loadProducts() {
    if (this.loading) return;
    this.loadNextPage.emit({ page: this.page, pageSize: this.pageSize });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPos = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollPos >= docHeight) this.loadProducts();
  }

  getColumnLabel(key: string) {
    const col = this.columnOptions.find(c => c.key === key);
    return col ? col.label : key;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  @HostListener('window:resize')
  updateScreenSize() {
    this.isDesktop = window.innerWidth >= 1100;
  }





  onFilterChange(filter: any) {
    if (!this.queryData.filters) this.queryData.filters = [];

    // Проверка на пустые значения для фильтра с типами 6, 7, 8, 9
    if ([6, 7, 8, 9].includes(filter.type) && (filter.values && filter.values[0] === "")) {
      // Если значения пустые, не добавляем фильтр
      this.queryData.filters = this.queryData.filters.filter(
        (f: any) => !(f.field === filter.field && [6, 7, 8, 9].includes(f.type))
      );
      this.loadProducts();
      console.log('Обновленные фильтры:', this.queryData.filters);
      return; // Выходим из метода, чтобы не продолжать добавление фильтра
    }

    // Удаляем все фильтры с тем же полем и типом из массива, если тип фильтра один из 6, 7, 8, 9
    if ([6, 7, 8, 9].includes(filter.type)) {
      this.queryData.filters = this.queryData.filters.filter(
        (f: any) => !(f.field === filter.field && [6, 7, 8, 9].includes(f.type))
      );
    }

    // Удаляем все фильтры с тем же полем и типом из массива, если тип фильтра один из 2, 3, 4, 5
    if ([2, 3, 4, 5].includes(filter.type)) {
      this.queryData.filters = this.queryData.filters.filter(
        (f: any) => !(f.field === filter.field && [2, 3, 4, 5].includes(f.type))
      );
    }

    // Добавляем или обновляем фильтр
    const existingFilter = this.queryData.filters.find(
      (f: any) => f.field === filter.field && f.type === filter.type
    );

    if (existingFilter) {
      existingFilter.values = filter.values; // Обновляем значения
    } else if (filter.values && filter.values[0] !== "") {
      // Добавляем фильтр только если значения не пустые
      this.queryData.filters.push(filter);
    }

    // Удаляем фильтр, если values стал пустым массивом или `[""]`
    this.queryData.filters = this.queryData.filters.filter((f: any) => f.values && f.values.length > 0 && f.values[0] !== "");

    this.filterChange.emit(this.queryData);
  }



  queryData: any;
  onSortChange(sort: any) {
    if (!this.queryData.sorts) this.queryData.sorts = [];

    const existingSort = this.queryData.sorts.find((s: any) => s.field === sort.field);

    if (existingSort) {
      existingSort.sortType = sort.sortType; // Обновляем тип сортировки
    } else {
      this.queryData.sorts.push(sort); // Добавляем новую сортировку
    }
    this.sortChange.emit(sort);
  }


}
