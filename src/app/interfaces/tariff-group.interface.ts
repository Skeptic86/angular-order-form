import { ITariff } from "./tariff.interface";

export interface ITariffGroup {
    code: string,
    name: string,
    tarrifs: ITariff[]
}