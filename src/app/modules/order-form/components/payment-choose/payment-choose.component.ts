import { IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { IPayment } from 'src/app/interfaces/payment.interface';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentTypeIconsEnum } from 'src/app/enums/payment-type-to-icons-enum';
@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss'],
})
export class PaymentChooseComponent implements OnInit {
  @Input() payment?: IPayment;
  @Input() paymentMethod?: IPaymentMethod;
  icon = '';

  readonly codeIcons = PaymentTypeIconsEnum;

  changePayment(paymentMethod: IPaymentMethod): void {
    this.setAppStatePayment(paymentMethod);
  }

  private setAppStatePayment(paymentObj: IPaymentMethod): void {
    this.appStateService.setAppState({ payment: paymentObj });
  }

  // private setPaymentInit(paymentTypeURLParam: string | null) {
  //   if (paymentTypeURLParam) {
  //     const name = this.findNameByType(paymentTypeURLParam);
  //     if (name) {
  //       this.changePayment(paymentTypeURLParam, name);
  //     }
  //   } else {
  //     this.changePayment(
  //       this.payment.paymentMethods[0].type,
  //       this.payment.paymentMethods[0].name
  //     );
  //   }
  // }

  ngOnInit(): void {}

  constructor(private appStateService: AppStateService) {}
}
