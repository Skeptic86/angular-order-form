import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ActivatedRoute } from '@angular/router';
import { IAddress } from './../../interfaces/address.interface';
import { IDefault } from './../../interfaces/default.interface';
import { IPayment } from './../../interfaces/payment.interface';
import { IAppState } from './../../interfaces/app-state.interface';
import { PaymentChooseService } from './../payment-choose/payment-choose.service';
import { CompleteService } from './../complete/complete.service';
import { TariffService } from './../tariff/tariff.service';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ITariff } from 'src/app/interfaces/tariff.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private payment?: IPayment;
  private tariffInfo?: IDefault;
  private addresses?: IAddress[];

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

  private findPaymentMethodByType(type: string) {
    return this.payment?.paymentMethods.find((elem) => elem.type === type);
  }

  private findAddressByTitle(title: string) {
    return this.addresses?.find((address) => address.title === title);
  }

  private findTarrifNameById(id: number) {
    let temp: ITariff | undefined;
    let res: ITariff | undefined;
    this.tariffInfo?.info.tariffGroups.forEach((elem) => {
      temp = elem.tariffs.find((tariff) => tariff.classId === id);
      if (temp) {
        res = temp;
      }
    });
    return res;
  }

  private getAppStateFromURL() {
    const tariffIdURLParam = this.route.snapshot.queryParamMap.get('tariffId');
    const numberTarrifIdURL = this.ConvertStringToNumber(tariffIdURLParam);
    const paymentTypeURLParam = this.route.snapshot.paramMap.get('paymentType');
    const addressFromURLParam = this.route.snapshot.paramMap.get('addressFrom');
    const addressToURLParam = this.route.snapshot.paramMap.get('addressTo');

    const paramState: IAppState = {
      tariff: this.findTarrifNameById(numberTarrifIdURL),
      payment: {
        paymentMethods: [this.findPaymentMethodByType(paymentTypeURLParam!)!],
      },
      addressFrom: this.findAddressByTitle(addressFromURLParam!),
      addressTo: this.findAddressByTitle(addressToURLParam!),
    };
    return paramState;
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
    this.appStateService.setAppState(this.getAppStateFromURL());
  }
}
