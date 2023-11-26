import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Alert } from '../models/Alert';
import { AlertType } from '../models/AlertType';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<Alert> = new BehaviorSubject({} as Alert);

  constructor() { }

  message(message: string, duration: number = -1) {
    this.notify(message,"message" , duration);
  }

  warning(message: string, duration: number = -1) {
    this.notify(message, "warning", duration);
  }
  
  error(message: string, duration: number = -1) {
    this.notify(message, "error", duration);
  }

  private notify(message: string, type: AlertType,  duration: number) {
    duration = !duration ? 3000 : duration;

    const alert: Alert = {
      message, type, duration
    };

    this.notification$.next(alert);
}

  get notification() {
    return this.notification$.asObservable();
}
}
