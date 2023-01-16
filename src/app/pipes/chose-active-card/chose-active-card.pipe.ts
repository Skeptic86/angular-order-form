import { IBankCards } from './../../interfaces/bank-cards.interface';
import { IPayment } from './../../interfaces/payment.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'choseActiveCard'
})
export class ChoseActiveCardPipe implements PipeTransform {

  mask = ''

  transform(bankCards: IBankCards[]): string {
    bankCards.forEach((elem) => {
      if(elem.cardStatus === 'ACTIVE')
      this.mask = elem.maskedPan
    })
    return this.mask
  }

}
