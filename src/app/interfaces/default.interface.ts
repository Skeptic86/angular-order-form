import { IDefaultInfo } from './default-info.interface';

export interface IDefault {
  base?: number;
  address?: string | null;
  info: IDefaultInfo;
}
