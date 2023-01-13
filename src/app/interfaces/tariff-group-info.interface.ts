import { ITariffGroup } from "./tariff-group.interface";

export interface ITariffGroupInfo {
    callCenterNumber: string,
    tariffGroups: ITariffGroup[]
}