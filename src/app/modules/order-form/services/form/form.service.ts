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
import { GetAddressesService } from '../get-addresses/get-addresses.service';
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
  // private addresses$$ = new BehaviorSubject<IAddress[] | null>(null);
  private addressesFrom$$ = new BehaviorSubject<IAddress[] | null>(null);
  private addressesTo$$ = new BehaviorSubject<IAddress[] | null>(null);

  private getPayment(): Observable<IPayment> {
    return this.paymentChooseService.getPayment();
  }

  private getDefault(): Observable<IDefault> {
    return this.tariffService.getDefaults();
  }

  // private getAddresses(): Observable<IAddress[]> {
  //   return this.getAddressesService.getAddresses();
  // }

  private getAddressesApi(queryAddress: string | null) {
    return this.getAddressesService.getAddressesApi(queryAddress);
  }

  private ConvertStringToNumber(input: string | null) {
    if (!input || input.trim().length == 0) return NaN;
    return Number(input);
  }

  private findPaymentMethodByType(payment: IPayment, type: string | null) {
    if (type !== null) {
      return payment?.paymentMethods.find((elem) => elem.type === type);
    }
    return {} as IPaymentMethod;
  }

  private findAddressByTitle(addresses: IAddress[], title: string | null) {
    console.log('title', title);
    if (title !== null) {
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

  private getAppStateFromURL(
    tariffId: string | null,
    paymentType: string | null,
    addressFrom: string | null,
    addressTo: string | null
  ) {
    const tariffIdURLParam = this.route.snapshot.queryParamMap.get('tariffId');
    const numberTarrifIdURL = this.ConvertStringToNumber(tariffId);
    const paymentTypeURLParam =
      this.route.snapshot.queryParamMap.get('paymentType');
    const addressFromURLParam =
      this.route.snapshot.queryParamMap.get('addressFrom');
    const addressToURLParam =
      this.route.snapshot.queryParamMap.get('addressTo');
    console.log(
      numberTarrifIdURL,
      paymentTypeURLParam,
      addressFromURLParam,
      addressToURLParam
    );

    const paramState: IAppState = {
      tariff: this.findTarrifNameById(
        this.tariffInfo$$.getValue()!,
        numberTarrifIdURL
      ),
      payment: {
        paymentMethods: [
          this.findPaymentMethodByType(
            this.payment$$.getValue()!,
            paymentType
          )!,
        ],
      },
      addressFrom: this.findAddressByTitle(
        this.addressesFrom$$.getValue()!,
        addressFrom
      ),
      addressTo: this.findAddressByTitle(
        this.addressesTo$$.getValue()!,
        addressTo
      ),
    };

    return paramState;
  }

  formInit() {
    const tariffIdURLParam = this.route.snapshot.queryParamMap.get('tariffId');
    const paymentTypeURLParam =
      this.route.snapshot.queryParamMap.get('paymentType');
    const addressFromURLParam =
      this.route.snapshot.queryParamMap.get('addressFrom');
    const addressToURLParam =
      this.route.snapshot.queryParamMap.get('addressTo');
    console.log(
      tariffIdURLParam,
      paymentTypeURLParam,
      addressFromURLParam,
      addressToURLParam
    );
    forkJoin({
      tariffs: this.getDefault(),
      payments: this.getPayment(),
      addressesFrom: this.getAddressesApi(addressFromURLParam),
      addressesTo: this.getAddressesApi(addressToURLParam),
    })
      .pipe(
        catchError((error) => of(error)),
        tap(({ tariffs, payments, addressesFrom, addressesTo }) => {
          this.tariffInfo$$.next(tariffs);
          this.payment$$.next(payments);
          this.addressesFrom$$.next(addressesFrom);
          this.addressesTo$$.next(addressesTo);
          console.log(this.addressesFrom$$);
          this.appStateService.setAppState(
            this.getAppStateFromURL(
              tariffIdURLParam,
              paymentTypeURLParam,
              addressFromURLParam,
              addressToURLParam
            )
          );
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
    private getAddressesService: GetAddressesService,
    private paymentChooseService: PaymentChooseService,
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {}
}
