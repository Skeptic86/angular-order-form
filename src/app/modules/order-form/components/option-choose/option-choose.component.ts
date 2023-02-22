import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPayment, IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { PaymentTypeIconsEnum } from 'src/app/enums/payment-type-to-icons-enum';

@Component({
  selector: 'app-option-choose',
  templateUrl: './option-choose.component.html',
  styleUrls: ['./option-choose.component.scss'],
})
export class OptionChooseComponent {
  @Input() payment?: IPayment;
  @Input() paymentMethod?: IPaymentMethod;
  @Output() toggleShowCountriesEvent = new EventEmitter<true>();
  icon = '';

  readonly codeIcons = PaymentTypeIconsEnum;

  changePayment(paymentMethod: IPaymentMethod): void {
    this.setAppStatePayment(paymentMethod);
  }

  toggleShowCountries(): void {
    this.toggleShowCountriesEvent.emit(true);
  }

  private setAppStatePayment(paymentObj: IPaymentMethod): void {
    this.appStateService.setAppState({ payment: paymentObj });
  }

  constructor(private appStateService: AppStateService) {}
}
