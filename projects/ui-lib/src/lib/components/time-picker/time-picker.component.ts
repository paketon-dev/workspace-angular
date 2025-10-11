import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'lib-time-picker',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ]
})
export class TimePickerComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Выберите время';
  @Input() minHour: number = 0;
  @Input() maxHour: number = 23;
  @Input() stepMinutes: number = 1;

  value: { hours: number; minutes: number } | null = null;
  showPicker = false;

  private onChange = (v: any) => { };
  private onTouched = () => { };

  writeValue(obj: any): void {
    this.value = obj ?? null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  togglePicker() {
    this.showPicker = !this.showPicker;
  }

  selectHour(hour: number) {
    this.value = { hours: hour, minutes: this.value?.minutes || 0 };
    this.onChange(this.value);
  }

  selectMinute(minute: number) {
    if (!this.value) return;
    this.value.minutes = minute;
    this.onChange(this.value);
    this.showPicker = false;
  }


  get hours(): number[] {
    const arr = [];
    for (let i = this.minHour; i <= this.maxHour; i++) arr.push(i);
    return arr;
  }

  get minutes(): number[] {
    const arr = [];
    for (let i = 0; i < 60; i += this.stepMinutes) arr.push(i);
    return arr;
  }

  displayValue(): string {
    if (!this.value) return '';
    const h = String(this.value.hours).padStart(2, '0');
    const m = String(this.value.minutes).padStart(2, '0');
    return `${h}:${m}`;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!this.el.nativeElement.contains(target)) {
      this.showPicker = false;
    }
  }

  constructor(private el: ElementRef) { }
}