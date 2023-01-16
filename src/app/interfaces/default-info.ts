import { IDefault } from './default.interface';
import { ITariffGroup } from "./tariff-group.interface";

export interface IDefaultInfo {
    callCenterNumber: string,
    tariffGroups: ITariffGroup[]
}