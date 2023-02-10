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

  private getDefaultsApi(): Observable<IDefault> {
    return this.tariffService.getDefaultsApi();
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
    return undefined;
  }

  private findAddressByTitle(addresses: IAddress[], title: string | null) {
    if (title !== null) {
      return addresses.find((address) => address.title === title);
    }
    return undefined;
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
    return undefined;
  }

  private getTariffFromURL(state: IAppState, url: string): IAppState {
    const numberTarrifIdURL = this.ConvertStringToNumber(url);
    let tariff = this.findTarrifNameById(
      this.tariffInfo$$.getValue()!,
      numberTarrifIdURL
    );
    return { ...state, tariff };
  }

  private getPaymentFromURL(state: IAppState, url: string): IAppState {
    let payment = this.findPaymentMethodByType(this.payment$$.getValue()!, url);
    return { ...state, payment };
  }

  private getAddressFromURL(state: IAppState, url: string): IAppState {
    let addressFrom = this.findAddressByTitle(
      this.addressesFrom$$.getValue()!,
      url
    );
    return { ...state, addressFrom };
  }

  private getAddressToURL(state: IAppState, url: string): IAppState {
    let addressTo = this.findAddressByTitle(
      this.addressesTo$$.getValue()!,
      url
    );
    return { ...state, addressTo };
  }

  // private getAppStateFromURL(
  //   tariffId: string | null,
  //   paymentType: string | null,
  //   addressFrom: string | null,
  //   addressTo: string | null
  // ) {
  //   const numberTarrifIdURL = this.ConvertStringToNumber(tariffId);

  //   let paramState: IAppState = {
  //     tariff: this.findTarrifNameById(
  //       this.tariffInfo$$.getValue()!,
  //       numberTarrifIdURL
  //     ),
  //     payment: this.findPaymentMethodByType(
  //       this.payment$$.getValue()!,
  //       paymentType
  //     )!,
  //     addressFrom: this.findAddressByTitle(
  //       this.addressesFrom$$.getValue()!,
  //       addressFrom
  //     ),
  //     addressTo: this.findAddressByTitle(
  //       this.addressesTo$$.getValue()!,
  //       addressTo
  //     ),
  //   };

  //   return paramState;
  // }

  formInit() {
    const tariffIdURLParam = this.route.snapshot.queryParamMap.get('tariffId');
    const paymentTypeURLParam =
      this.route.snapshot.queryParamMap.get('paymentType');
    const addressFromURLParam =
      this.route.snapshot.queryParamMap.get('addressFrom');
    const addressToURLParam =
      this.route.snapshot.queryParamMap.get('addressTo');
    forkJoin({
      tariffs: this.getDefaultsApi(),
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
          if (tariffIdURLParam) {
            this.appStateService.setAppState(
              this.getTariffFromURL(
                this.appStateService.getStateValue(),
                tariffIdURLParam
              )
            );
          }
          if (paymentTypeURLParam) {
            this.appStateService.setAppState(
              this.getPaymentFromURL(
                this.appStateService.getStateValue(),
                paymentTypeURLParam
              )
            );
          }
          if (addressFromURLParam) {
            this.appStateService.setAppState(
              this.getAddressFromURL(
                this.appStateService.getStateValue(),
                addressFromURLParam
              )
            );
          }
          if (addressToURLParam) {
            this.appStateService.setAppState(
              this.getAddressToURL(
                this.appStateService.getStateValue(),
                addressToURLParam
              )
            );
          }
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
