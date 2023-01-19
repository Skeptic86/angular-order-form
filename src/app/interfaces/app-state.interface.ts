import { ITariff } from './tariff.interface';
import { IPayment } from './payment.interface';

export interface IAppState {
  paymentType: string | null;
  tariff: string | null;
  addressFrom: string | null;
  addressTo: string | null;
}
