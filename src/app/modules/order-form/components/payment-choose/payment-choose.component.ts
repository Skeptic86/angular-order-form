import { IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './../../../../services/app-state/app-state.service';
import { IPayment } from './../../../../interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentTypeIconsEnum } from '../../../../enums/payment-type-to-icons-enum';
import { tap, Observable } from 'rxjs';

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

  changePayment(paymentMethod: IPaymentMethod) {
    this.setAppStatePayment(paymentMethod);
  }

  private setAppStatePayment(paymentObj: IPaymentMethod) {
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

  ngOnInit() {}

  constructor(private appStateService: AppStateService) {}
}
