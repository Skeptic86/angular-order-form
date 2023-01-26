import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './../../services/app-state/app-state.service';
import { IPayment } from './../../interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, OnInit } from '@angular/core';
import { NameIconsEnum } from '../../enums/payment-name-to-icons-enum';
import { GetPriceService } from 'src/app/services/get-price/get-price.service';
import { distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss'],
})
export class PaymentChooseComponent implements OnInit {
  payment: IPayment = {} as IPayment;
  icon = '';

  readonly codeIcons = NameIconsEnum;

  changeIcon(iconName: string, paymentName: string) {
    const keyTyped = iconName as keyof typeof this.codeIcons;
    this.icon = this.codeIcons[keyTyped];
    this.setAppState(paymentName);
  }

  private getPayment() {
    return this.paymentChooseService
      .getPayment()
      .subscribe((data: IPayment) => {
        this.payment = data;
      });
  }

  private setAppState(paymentName: string) {
    this.appStateService.setAppState({ paymentType: paymentName });
  }

  private setPaymentStateFromURL(paymentURL: string | null) {
    if (paymentURL) {
      this.appStateService.setAppState({ paymentType: paymentURL });
      const indexOfIcon = Object.values(this.codeIcons).indexOf(
        paymentURL as NameIconsEnum
      );
      console.log(indexOfIcon, 'index');
      const key = Object.keys(this.codeIcons)[indexOfIcon];
      console.log(key, paymentURL);
      this.changeIcon(key, paymentURL);
    } else {
      this.changeIcon(
        this.payment.paymentMethods[0].type,
        this.payment.paymentMethods[0].name
      );
    }
  }

  ngOnInit() {
    this.getPayment();
    const url_payment = this.route.snapshot.queryParamMap.get('payment');
    console.log(url_payment);
    this.setPaymentStateFromURL(url_payment);
  }

  constructor(
    private paymentChooseService: PaymentChooseService,
    private appStateService: AppStateService,
    private route: ActivatedRoute
  ) {}
}
