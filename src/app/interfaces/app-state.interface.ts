import { IAddress } from 'src/app/interfaces/address.interface';
import { ITariff } from './tariff.interface';
import { IPayment } from './payment.interface';

export interface IAppState {
  payment: IPayment | undefined;
  tariff: ITariff | undefined;
  addressFrom: IAddress | undefined;
  addressTo: IAddress | undefined;
}
