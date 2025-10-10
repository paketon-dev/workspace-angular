import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UuidSearchFilterSortService } from './uuid-search-filter-sort.service';

interface FilterDto {
  field?: string;
  values?: any[]; // Используем `any`, так как тип данных может варьироваться
  type?: number; // 0 - string, 1 - int, 2 - DateTime, 3 - Guid
}

interface SortDto {
  field?: string;
  sortType: number; // 0 - прямой, 1 - обратный
}

@Component({
  selector: 'app-uuid-search-filter-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uuid-search-filter-sort.component.html',
  styleUrls: ['./uuid-search-filter-sort.component.scss']
})
export class UuidSearchFilterSortComponent {
  @Input() filterField: string = ''; // Название поля для фильтрации
  @Input() filterType: number = 0; // Тип фильтрации (0 - string, 1 - int и т.д.)
  @Input() searchField: string = '';
  @Input() apiEndpoint: string = ''; // Эндпоинт для запроса
  @Input() fieldNames: string = ''; // Массив полей для отображения в выпадающем списке
  @Input() Field: string = ''; 
  @Input() enam: any;
  @Input() domain: string = ''; 

  searchTerm: string = '';
  selectedFilters: any[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  isFilterOpen = false;

  @Output() filterChange = new EventEmitter<FilterDto>();
  @Output() sortChange = new EventEmitter<SortDto>();

  products: any[] = [];
  endpointDataLoaded = false;

  constructor(private uuidSearchFilterSortService: UuidSearchFilterSortService,
    private elementRef: ElementRef
  ) { }

  inputWidth: string = '30px';
  bgColor: string = 'transparent';
  borderStyle: string = 'none';
  isSearchOpen: boolean = false;
  
  toggleSearch(isFocused: boolean) {
    if (isFocused) {
      this.inputWidth = '200px';
      this.bgColor = '#ffffff';
      this.borderStyle = '1px solid #007BFF';
      this.isSearchOpen = true;
    } else {
      setTimeout(() => { 
        this.inputWidth = '30px';
        this.bgColor = 'transparent';
        this.borderStyle = 'none';
        this.isSearchOpen = false;
      }, 200);
    }
  }


  ngOnChanges() {
    console.log('apiEndpointapiEndpoint', this.apiEndpoint);
  
    if (this.apiEndpoint && !this.endpointDataLoaded && this.enam == null) {
      this.uuidSearchFilterSortService.domain = this.domain;
      this.loadData(); 
    }
  
    if (this.enam != null) {
      this.products = this.enam;
      this.endpointDataLoaded = true;
    }
  }
  

  loadData() {
    this.uuidSearchFilterSortService.getProductsByEndpoint(this.apiEndpoint).subscribe(
      (data: any) => {
        console.log('datdatadatadataa',data)
        this.products = data.data;
        this.endpointDataLoaded = true;
        console.log('Данные получены с эндпоинта:', this.products);
      },
      (error) => {
        console.error('Ошибка загрузки данных с эндпоинта:', error);
      }
    );
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  onSearchChange() {
    const filterDto: FilterDto = {
      field: this.searchField || this.Field,
      values: this.searchTerm ? [this.searchTerm] : [],
      type: 0
    };
    
    this.filterChange.emit(filterDto);
  }

  onFilterChange(id: number) {
    // Проверяем, выбран ли продукт, и добавляем/удаляем его из списка фильтров
    if (this.selectedFilters.includes(id)) {
      this.selectedFilters = this.selectedFilters.filter(selectedId => selectedId !== id);
    } else {
      this.selectedFilters.push(id);
    }

    // Создаем объект фильтра для передачи в родительский компонент
    const filterDto: FilterDto = {
      field: this.Field,
      values: this.selectedFilters,
      type: this.filterType
    };

    // Эмитируем изменение фильтра
    this.filterChange.emit(filterDto);
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';

    const sortDto: SortDto = {
      field: this.Field,
      sortType: this.sortOrder === 'asc' ? 0 : 1
    };

    this.sortChange.emit(sortDto);
  }

  getDisplayText(field: string): string {
    // Функция для формирования строки для отображения на основе полей
    return field.split(',').join(' ');
  }

  resetFilter() {
    this.selectedFilters = []; // Очищаем выбранные фильтры
    const filterDto: FilterDto = {
      field: this.filterField,
      values: [],
      type: this.filterType
    };
    this.filterChange.emit(filterDto); 
  }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside ) {
        this.isFilterOpen = false;
      }
      if (!clickedInside  && this.inputWidth != '30px') {
        this.inputWidth = '30px';
        this.bgColor = 'transparent';
        this.borderStyle = 'none';
        this.isSearchOpen = false;
      }
    }
}
