import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ToastMessage } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(toast: Omit<ToastMessage, 'id'>) {
    const newToast: ToastMessage = { ...toast, id: uuidv4() };
    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, newToast]);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => this.remove(newToast.id!), toast.duration);
    }
  }

  remove(id: string) {
    const current = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(current);
  }

  success(message: string, title?: string, duration = 3000) {
    this.show({ type: 'success', message, title, duration });
  }

  error(message: string, title?: string, duration = 3000) {
    this.show({ type: 'error', message, title, duration });
  }

  info(message: string, title?: string, duration = 3000) {
    this.show({ type: 'info', message, title, duration });
  }

  warning(message: string, title?: string, duration = 3000) {
    this.show({ type: 'warning', message, title, duration });
  }
}
