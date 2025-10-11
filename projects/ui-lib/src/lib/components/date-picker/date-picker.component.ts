import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-date-picker',
  standalone: true, 
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'], 
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent  implements ControlValueAccessor {
  @Input() placeholder: string = 'Выберите дату';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  value: Date | null = null;
  showCalendar = false;

  weeks: (Date | null)[][] = [];
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  private onChange = (v: any) => {};
  private onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ? new Date(obj) : null;
    if (this.value) {
      this.selectedMonth = this.value.getMonth();
      this.selectedYear = this.value.getFullYear();
    }
    this.generateCalendar();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  selectDate(date: Date) {
    if (this.minDate && date < this.minDate) return;
    if (this.maxDate && date > this.maxDate) return;

    this.value = date;
    this.onChange(date);
    this.showCalendar = false;
  }

  prevMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1);
    const lastDay = new Date(this.selectedYear, this.selectedMonth + 1, 0);
    const startDay = firstDay.getDay(); // 0-6
    const daysInMonth = lastDay.getDate();

    let weeks: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(new Date(this.selectedYear, this.selectedMonth, day));
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  isSelected(date: Date | null): any {
    return date && this.value && date.toDateString() === this.value.toDateString();
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.showCalendar = false;
    }
  }

  constructor(private el: ElementRef) {
    this.generateCalendar();
  }
}