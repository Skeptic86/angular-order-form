import { IBankCards } from './bank-cards.interface';
export interface IPayment {
  token: string;
  paymentMethods: IPaymentMethod[];
}

interface IPaymentMethod {
  name: string;
  type: string;
  bankCards: IBankCards[];
}
