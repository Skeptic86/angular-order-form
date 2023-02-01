import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ActivatedRoute } from '@angular/router';
import { IAddress } from './../../../../interfaces/address.interface';
import { IDefault } from './../../../../interfaces/default.interface';
import {
  IPayment,
  IPaymentMethod,
} from './../../../../interfaces/payment.interface';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { PaymentChooseService } from './../payment-choose/payment-choose.service';
import { CompleteService } from './../complete/complete.service';
import { TariffService } from './../tariff/tariff.service';
import { Injectable } from '@angular/core';
import {
  Observable,
  tap,
  BehaviorSubject,
  forkJoin,
  catchError,
  of,
} from 'rxjs';
import { ITariff } from 'src/app/interfaces/tariff.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private payment$$ = new BehaviorSubject<IPayment | null>(null);
  private tariffInfo$$ = new BehaviorSubject<IDefault | null>(null);
  private addresses$$ = new BehaviorSubject<IAddress[] | null>(null);

  private getPayment(): Observable<IPayment> {
    return this.paymentChooseService.getPayment();
  }

  private getDefault(): Observable<IDefault> {
    return this.tariffService.getTariffGroupsInfo();
  }

  private getAddresses(): Observable<IAddress[]> {
    return this.completeService.getAddresses();
  }

  private ConvertStringToNumber(input: string | null) {
    if (!input || input.trim().length == 0) return NaN;
    return Number(input);
  }

  private classId = this.ConvertStringToNumber(
    this.route.snapshot.paramMap.get('classId')
  );
  private paymentType = this.route.snapshot.paramMap.get('paymentType');
  private addressFrom = this.route.snapshot.paramMap.get('addressFrom');
  private addressTo = this.route.snapshot.paramMap.get('addressTo');

  private findPaymentMethodByType(payment: IPayment, type: string | null) {
    if (type !== null) {
      return payment?.paymentMethods.find((elem) => elem.type === type);
    }
    return {} as IPaymentMethod;
  }

  private findAddressByTitle(addresses: IAddress[], title: string | null) {
    if (title !== null) {
      console.log('addresses', addresses);
      return addresses.find((address) => address.title === title);
    }
    return {} as IAddress;
  }

  private findTarrifNameById(tariffInfo: IDefault, id: number) {
    if (!isNaN(id)) {
      let temp: ITariff | undefined;
      let res: ITariff | undefined;
      tariffInfo?.info.tariffGroups.forEach((elem) => {
        temp = elem.tariffs.find((tariff) => tariff.classId === id);
        if (temp) {
          res = temp;
        }
      });
      return res;
    }
    return {} as ITariff;
  }

  private getAppStateFromURL() {
    const tariffIdURLParam = this.route.snapshot.queryParamMap.get('tariffId');
    const numberTarrifIdURL = this.ConvertStringToNumber(tariffIdURLParam);
    const paymentTypeURLParam =
      this.route.snapshot.queryParamMap.get('paymentType');
    const addressFromURLParam =
      this.route.snapshot.queryParamMap.get('addressFrom');
    const addressToURLParam =
      this.route.snapshot.queryParamMap.get('addressTo');

    const paramState: IAppState = {
      tariff: this.findTarrifNameById(
        this.tariffInfo$$.getValue()!,
        numberTarrifIdURL
      ),
      payment: {
        paymentMethods: [
          this.findPaymentMethodByType(
            this.payment$$.getValue()!,
            paymentTypeURLParam
          )!,
        ],
      },
      addressFrom: this.findAddressByTitle(
        this.addresses$$.getValue()!,
        addressFromURLParam
      ),
      addressTo: this.findAddressByTitle(
        this.addresses$$.getValue()!,
        addressToURLParam
      ),
    };
    return paramState;
  }

  formInit() {
    forkJoin({
      tariffs: this.getDefault(),
      payments: this.getPayment(),
      addresses: this.getAddresses(),
    })
      .pipe(
        catchError((error) => of(error)),
        tap(({ tariffs, payments, addresses }) => {
          this.tariffInfo$$.next(tariffs);
          this.payment$$.next(payments);
          this.addresses$$.next(addresses);
          this.appStateService.setAppState(this.getAppStateFromURL());
        })
      )
      .subscribe();
    // this.getAddresses().subscribe((value: IAddress[]) => {
    //   this.addresses$$?.next(value);
    // });
    // this.getDefault().subscribe((value: IDefault) => {
    //   this.tariffInfo$$?.next(value);
    // });
    // this.getPayment().subscribe((value: IPayment) => {
    //   this.payment$$?.next(value);
    // });
  }

  constructor(
    private tariffService: TariffService,
    private completeService: CompleteService,
    private paymentChooseService: PaymentChooseService,
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {}
}
