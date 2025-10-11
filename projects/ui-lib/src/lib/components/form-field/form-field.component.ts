import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'lib-form-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  /** Лейбл поля */
  @Input() label: string = '';

  /** Placeholder */
  @Input() placeholder: string = '';

  /** Иконка слева или справа */
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  /** Тип input */
  @Input() type: string = 'text';

  /** FormControl из reactive forms */
  @Input() control!: FormControl;

  /** Дополнительный класс */
  @Input() customClass: string = '';

  /** Проверка видимости ошибок */
  get showError(): boolean {
    return this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  /** Возвращает первую ошибку */
  get errorMessage(): string | null {
    const errors: ValidationErrors | null = this.control?.errors;
    if (!errors) return null;

    if (errors['required']) return 'Поле обязательно';
    if (errors['email']) return 'Неверный формат email';
    if (errors['minlength']) return `Минимум ${errors['minlength'].requiredLength} символов`;
    if (errors['maxlength']) return `Максимум ${errors['maxlength'].requiredLength} символов`;
    if (errors['pattern']) return 'Неверный формат';

    return 'Ошибка';
  }
}
