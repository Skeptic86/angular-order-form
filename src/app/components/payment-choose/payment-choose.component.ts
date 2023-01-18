import { IPayment } from './../../interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, OnInit } from '@angular/core';
import { NameIconsEnum } from '../../enums/payment-name-to-icons-enum';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss'],
})
export class PaymentChooseComponent implements OnInit {
  payment: IPayment = {} as IPayment;
  icon = '';

  readonly codeIcons = NameIconsEnum;

  changeIcon(iconName: string) {
    const keyTyped = iconName as keyof typeof this.codeIcons;
    this.icon = this.codeIcons[keyTyped];
    if (iconName !== this.icon && this.icon !== '') {
      this.appStateService.sendClickEvent();
    }
  }

  private getPayment() {
    return this.paymentChooseService
      .getPayment()
      .subscribe((data: IPayment) => {
        this.payment = data;
        this.changeIcon(this.payment.paymentMethods[0].type);
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
