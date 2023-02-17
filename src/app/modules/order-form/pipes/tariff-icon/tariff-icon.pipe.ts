import { ITariff } from 'src/app/interfaces/tariff.interface';
import { ITariffGroup } from 'src/app/interfaces/tariff-group.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { CodeIconsEnum } from 'src/app/enums/tariff-code-to-icons-enum';

@Pipe({
  name: 'tariffIcon',
})
export class TariffIconPipe implements PipeTransform {
  readonly codeIcons = CodeIconsEnum;

  transform(
    tariffClassId: number | undefined,
    tariffGroups: ITariffGroup[] = []
  ): string {
    if (tariffClassId && tariffGroups) {
      const tariffGroupCode = this.findCodeById(tariffClassId, tariffGroups);
      return this.codeIcons[tariffGroupCode as keyof typeof this.codeIcons];
    } else {
      return this.codeIcons.CAR;
    }
  }

  private findCodeById(
    tariffClassId: number,
    tariffGroups: ITariffGroup[]
  ): string | undefined {
    let temp: ITariff | undefined;
    let res: string | undefined;
    tariffGroups.forEach((elem) => {
      temp = elem.tariffs.find((tariff) => tariff.classId === tariffClassId);
      if (temp) {
        res = elem.code;
      }
    });
    return res;
  }
}
