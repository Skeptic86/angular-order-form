import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ActivatedRoute } from '@angular/router';
import { IAddress } from './../../interfaces/address.interface';
import { IDefault } from './../../interfaces/default.interface';
import { IPayment, IPaymentMethod } from './../../interfaces/payment.interface';
import { IAppState } from './../../interfaces/app-state.interface';
import { PaymentChooseService } from './../payment-choose/payment-choose.service';
import { CompleteService } from './../complete/complete.service';
import { TariffService } from './../tariff/tariff.service';
import { Injectable } from '@angular/core';
import { Observable, tap, Subject } from 'rxjs';
import { ITariff } from 'src/app/interfaces/tariff.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private payment?: Subject<IPayment>;
  private tariffInfo?: Subject<IDefault>;
  private addresses?: Subject<IAddress[]>;

  private getPayment(): Observable<IPayment> {
    return this.paymentChooseService
      .getPayment()
      .pipe(tap((value) => (this.payment = value)));
  }

  private getDefault(): Observable<IDefault> {
    return this.tariffService
      .getTariffGroupsInfo()
      .pipe(tap((value) => (this.tariffInfo = value)));
  }

  private getAddresses() {
    return this.completeService
      .getAddresses()
      .pipe(tap((value) => (this.addresses = value)));
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

  private findPaymentMethodByType(type: string | null) {
    if (type !== null) {
      console.log('pay', this.payment);
      return this.payment?.paymentMethods.find((elem) => elem.type === type);
    }
    return {} as IPaymentMethod;
  }

  private findAddressByTitle(title: string | null) {
    if (title !== null) {
      console.log('addresses', this.addresses);
      return this.addresses?.find((address) => address.title === title);
    }
    return {} as IAddress;
  }

  private findTarrifNameById(id: number) {
    if (!isNaN(id)) {
      let temp: ITariff | undefined;
      let res: ITariff | undefined;
      console.log('tariffs', this.tariffInfo);
      this.tariffInfo?.info.tariffGroups.forEach((elem) => {
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
    console.log(
      'params: ',
      numberTarrifIdURL,
      paymentTypeURLParam,
      addressFromURLParam
    );

    const paramState: IAppState = {
      tariff: this.findTarrifNameById(numberTarrifIdURL),
      payment: {
        paymentMethods: [this.findPaymentMethodByType(paymentTypeURLParam)!],
      },
      addressFrom: this.findAddressByTitle(addressFromURLParam),
      addressTo: this.findAddressByTitle(addressToURLParam),
    };
    return paramState;
  }

  formInit() {
    console.log('appstate from url', this.getAppStateFromURL());
    this.appStateService.setAppState(this.getAppStateFromURL());
  }

  constructor(
    private tariffService: TariffService,
    private completeService: CompleteService,
    private paymentChooseService: PaymentChooseService,
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {
    this.getAddresses().subscribe((value: IAddress[]) => {
      this.addresses = value;
    });
    this.getDefault().subscribe((value: IDefault) => {
      this.tariffInfo = value;
    });
    this.getPayment().subscribe((value: IPayment) => {
      this.payment = value;
    });
  }
}
