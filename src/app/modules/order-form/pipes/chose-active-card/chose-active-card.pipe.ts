import { IBankCards } from 'src/app/interfaces/bank-cards.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'choseActiveCard',
})
export class ChoseActiveCardPipe implements PipeTransform {
  private mask = '';

  transform(bankCards: IBankCards[]): string {
    bankCards.forEach((elem) => {
      if (elem.cardStatus === 'ACTIVE') this.mask = elem.maskedPan;
    });
    return this.mask;
  }
}
