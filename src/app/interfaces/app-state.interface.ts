import { IAddress } from './address.interface';
import { IDefault } from './default.interface';
import { ITariff } from './tariff.interface';
import { IPayment } from './payment.interface';

export interface IAppState {
  payment: IPayment | null;
  tariff: IDefault | null;
  addressFrom: IAddress | null;
  addressTo: IAddress | null;
}
