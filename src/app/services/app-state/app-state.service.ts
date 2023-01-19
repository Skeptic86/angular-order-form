import { IAppState } from './../../interfaces/app-state.interface';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  subject = new BehaviorSubject<IAppState>({
    paymentType: null,
    tariff: null,
    addressFrom: null,
    addressTo: null,
  });

  sendClickEvent() {}

  setAppState(fieldsToUpdate: Partial<IAppState>) {
    const newSubject = { ...this.subject.getValue(), ...fieldsToUpdate };
    this.subject.next(newSubject);
  }

  getState(): Observable<IAppState | undefined> {
    return this.subject.asObservable();
  }

  constructor() {}
}
