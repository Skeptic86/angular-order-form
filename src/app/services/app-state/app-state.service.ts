import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from './../../interfaces/app-state.interface';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  subject$ = new BehaviorSubject<IAppState>({
    paymentType: null,
    tariff: null,
    addressFrom: null,
    addressTo: null,
  });

  sendClickEvent() {}

  updateRoute() {
    this.router.navigate([
      '/order',
      {
        addressFrom: this.subject$.getValue().addressFrom,
        addressTo: this.subject$.getValue().addressTo,
        payment: this.subject$.getValue().paymentType,
        tariff: this.subject$.getValue().tariff,
      },
    ]);
  }

  setAppState(fieldsToUpdate: Partial<IAppState>) {
    const newSubject = { ...this.subject$.getValue(), ...fieldsToUpdate };
    this.subject$.next(newSubject);
    this.updateRoute();
  }

  getState(): Observable<IAppState | undefined> {
    return this.subject$.asObservable();
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
