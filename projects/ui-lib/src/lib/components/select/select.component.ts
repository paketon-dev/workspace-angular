import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'lib-select',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Выберите...';
  @Input() multiple: boolean = false;
  @Input() searchEnabled: boolean = false;

  value: any = null;
  showDropdown = false;
  searchTerm: string = '';

  private onChange = (v: any) => { };
  private onTouched = () => { };

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  getSelectedLabels(): string {
    if (!this.multiple || !this.value?.length) return '';
    const labels = this.value
      .map((v: any) => this.options.find(o => o.value === v))
      .filter((o: any) => !!o)
      .map((o: any) => o!.label);
    return labels.join(', ');
  }

  getSelectedLabel(): string {
    if (!this.value) return '';
    const option = this.options.find(o => o.value === this.value);
    return option ? option.label : '';
  }


  selectOption(option: SelectOption) {
    if (this.multiple) {
      if (!Array.isArray(this.value)) this.value = [];
      const index = this.value.findIndex((v: any) => v === option.value);
      if (index > -1) {
        this.value.splice(index, 1);
      } else {
        this.value.push(option.value);
      }
      this.onChange([...this.value]);
    } else {
      this.value = option.value;
      this.onChange(this.value);
      this.showDropdown = false;
    }
  }

  isSelected(option: SelectOption): boolean {
    if (this.multiple && Array.isArray(this.value)) {
      return this.value.includes(option.value);
    }
    return this.value === option.value;
  }

  get filteredOptions(): SelectOption[] {
    if (!this.searchEnabled || !this.searchTerm) return this.options;
    return this.options.filter(o =>
      o.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.showDropdown = false;
    }
  }

  constructor(private el: ElementRef) { }
}
