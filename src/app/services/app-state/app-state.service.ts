import { IAddress } from './../../interfaces/address.interface';
import { ITariff } from './../../interfaces/tariff.interface';
import { IDefault } from './../../interfaces/default.interface';
import { IPayment, IPaymentMethod } from './../../interfaces/payment.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from './../../interfaces/app-state.interface';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  subject$ = new BehaviorSubject<IAppState>({
    payment: {} as IPaymentMethod,
    tariff: {} as ITariff,
    addressFrom: {} as IAddress,
    addressTo: {} as IAddress,
  });

  sendClickEvent() {}

  private updateRoute() {
    this.router.navigate(['/order'], {
      queryParams: {
        addressFrom: this.subject$.getValue().addressFrom?.title,
        addressTo: this.subject$.getValue().addressTo?.title,
        paymentType: this.subject$.getValue().payment?.type,
        tariffId: this.subject$.getValue().tariff?.classId,
      },
      // relativeTo: this.route,
    });
  }

  setAppState(fieldsToUpdate: Partial<IAppState>) {
    const newSubject = { ...this.subject$.getValue(), ...fieldsToUpdate };
    this.subject$.next(newSubject);
    this.updateRoute();
  }

  getState(): Observable<IAppState> {
    return this.subject$.asObservable();
  }

  getStateValue(): IAppState {
    return this.subject$.getValue();
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
