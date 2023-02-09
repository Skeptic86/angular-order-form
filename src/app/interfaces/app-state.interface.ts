import { IAddress } from 'src/app/interfaces/address.interface';
import { ITariff } from './tariff.interface';
import { IPayment, IPaymentMethod } from './payment.interface';

export interface IAppState {
  payment: IPaymentMethod | undefined;
  tariff: ITariff | undefined;
  addressFrom: IAddress | undefined;
  addressTo: IAddress | undefined;
}
