import { IBase } from 'src/app/interfaces/base.interface';
import { IAddress } from 'src/app/interfaces/address.interface';
import { ITariff } from 'src/app/interfaces/tariff.interface';
import { IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { IAppState } from 'src/app/interfaces/app-state.interface';
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
    baseId: {} as number,
  });

  private updateRoute(): void {
    this.router.navigate(['/order'], {
      queryParams: {
        addressFrom: this.subject$.getValue().addressFrom?.title,
        addressTo: this.subject$.getValue().addressTo?.title,
        paymentType: this.subject$.getValue().payment?.type,
        tariffId: this.subject$.getValue().tariff?.classId,
        baseId: this.subject$.getValue().baseId,
      },
      // relativeTo: this.route,
    });
  }

  setAppState(fieldsToUpdate: Partial<IAppState>): void {
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

  private ConvertStringToNumber(input: string | null): number {
    if (!input || input.trim().length == 0) return 1;
    return Number(input);
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    const baseIdURLParam = this.route.snapshot.queryParamMap.get('baseId');
    this.ConvertStringToNumber(baseIdURLParam);
    this.setAppState({
      baseId: this.ConvertStringToNumber(baseIdURLParam),
    });
  }
}
