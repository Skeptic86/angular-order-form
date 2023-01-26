import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from './../../interfaces/app-state.interface';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  subject$ = new BehaviorSubject<IAppState>({
    payment: null,
    tariff: null,
    addressFrom: null,
    addressTo: null,
  });

  sendClickEvent() {}

  updateRoute() {
    this.router.navigate(['/order'], {
      queryParams: {
        addressFrom: this.subject$.getValue().addressFrom?.title,
        addressTo: this.subject$.getValue().addressTo?.title,
        payment: this.subject$.getValue().payment?.paymentMethods[0].name,
        tariff:
          this.subject$.getValue().tariff?.info.tariffGroups[0].tariffs[0].name,
      },
    });
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
