import { AppStateService } from './../../services/app-state/app-state.service';
import { IPayment } from './../../interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, OnInit } from '@angular/core';
import { NameIconsEnum } from '../../enums/payment-name-to-icons-enum';
import { GetPriceService } from 'src/app/services/get-price/get-price.service';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss'],
})
export class PaymentChooseComponent implements OnInit {
  payment: IPayment = {} as IPayment;
  icon = '';

  readonly codeIcons = NameIconsEnum;

  changeIcon(iconName: string, paymentName: string, bankCardMask?: string) {
    const keyTyped = iconName as keyof typeof this.codeIcons;
    this.icon = this.codeIcons[keyTyped];
    if (bankCardMask) {
      this.appStateService.setAppState({ paymentType: bankCardMask });
    } else {
      this.appStateService.setAppState({ paymentType: paymentName });
    }
  }

  private getPayment() {
    return this.paymentChooseService
      .getPayment()
      .subscribe((data: IPayment) => {
        this.payment = data;
        this.changeIcon(
          this.payment.paymentMethods[0].type,
          this.payment.paymentMethods[0].name
        );
      });
  }

  ngOnInit() {
    this.getPayment();
  }

  constructor(
    private paymentChooseService: PaymentChooseService,
    private appStateService: AppStateService
  ) {}
}
