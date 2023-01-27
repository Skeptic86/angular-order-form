import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './../../services/app-state/app-state.service';
import { IPayment } from './../../interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, OnInit } from '@angular/core';
import { PaymentTypeIconsEnum } from '../../enums/payment-type-to-icons-enum';
import { GetPriceService } from 'src/app/services/get-price/get-price.service';
import { distinctUntilChanged, switchMap, tap, Observable } from 'rxjs';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss'],
})
export class PaymentChooseComponent implements OnInit {
  payment: IPayment = {} as IPayment;
  icon = '';

  readonly codeIcons = PaymentTypeIconsEnum;

  changePayment(paymentType: string, paymentName: string) {
    const keyTypedPaymentType = paymentType as keyof typeof this.codeIcons;
    this.icon = this.codeIcons[keyTypedPaymentType];
    this.setAppStatePayment({
      paymentMethods: [{ name: paymentName, type: paymentType }],
    } as IPayment);
  }

  private getPayment(): Observable<IPayment> {
    return this.paymentChooseService
      .getPayment()
      .pipe(tap((value) => (this.payment = value)));
  }

  private setAppStatePayment(paymentObj: IPayment) {
    this.appStateService.setAppState({ payment: paymentObj });
  }

  private setPaymentInit(paymentTypeURLParam: string | null) {
    if (paymentTypeURLParam) {
      const name = this.findNameByType(paymentTypeURLParam);
      if (name) {
        this.changePayment(paymentTypeURLParam, name);
      }
    } else {
      this.changePayment(
        this.payment.paymentMethods[0].type,
        this.payment.paymentMethods[0].name
      );
    }
  }

  private findNameByType(type: string) {
    return this.payment.paymentMethods.find((elem) => elem.type === type)?.name;
  }

  ngOnInit() {
    this.getPayment()
      .pipe
      // tap((_) => {
      //   const paymentTypeURLParam =
      //     this.route.snapshot.queryParamMap.get('paymentType');
      //   console.log('url', paymentTypeURLParam);
      //   this.setPaymentInit(paymentTypeURLParam);
      // })
      ()
      .subscribe((data: IPayment) => {
        this.payment = data;
      });
  }

  constructor(
    private paymentChooseService: PaymentChooseService,
    private appStateService: AppStateService,
    private route: ActivatedRoute
  ) {}
}
