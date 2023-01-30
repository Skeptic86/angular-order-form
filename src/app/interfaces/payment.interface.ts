import { IBankCards } from './bank-cards.interface';
export interface IPayment {
  paymentMethods: IPaymentMethod[];
}

export interface IPaymentMethod {
  name: string;
  type: string;
  bankCards: IBankCards[];
}
