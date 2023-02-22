import { IPhoneFormat } from './phone-format.interface';
export interface ICountry {
  name: string;
  code: string;
  phoneFormats: IPhoneFormat[];
}
