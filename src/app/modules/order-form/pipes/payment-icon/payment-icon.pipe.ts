import { IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { PaymentTypeIconsEnum } from 'src/app/enums/payment-type-to-icons-enum';

@Pipe({
  name: 'paymentIcon',
})
export class PaymentIconPipe implements PipeTransform {
  readonly codeIcons = PaymentTypeIconsEnum;

  transform(paymentType: string | undefined): string {
    if (paymentType) {
      return this.codeIcons[paymentType as keyof typeof this.codeIcons];
    } else {
      return this.codeIcons.Cash;
    }
  }
}
