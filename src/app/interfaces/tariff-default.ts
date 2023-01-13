import { ITariffGroupInfo } from "./tariff-group-info.interface";

export interface ITariffDefalut {
    base: number,
    address: string | null,
    info: ITariffGroupInfo
}