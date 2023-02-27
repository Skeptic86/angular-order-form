import { IBase } from 'src/app/interfaces/base.interface';
import { IAddress } from 'src/app/interfaces/address.interface';
import { ITariff } from './tariff.interface';
import { IPayment, IPaymentMethod } from './payment.interface';

export interface IAppState {
  payment?: IPaymentMethod;
  tariff?: ITariff;
  addressFrom?: IAddress;
  addressTo?: IAddress;
  baseId?: number;
}
