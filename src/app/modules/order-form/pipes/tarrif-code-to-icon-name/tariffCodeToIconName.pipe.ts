import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tariffCodeToIconName',
})
export class TariffCodeToIconNamePipe implements PipeTransform {
  // codeIcons = {
  //   CAR: 'directions_car',
  //   DELIVERY: 'shopping_bag',
  //   TRUCK: 'local_shipping',
  //   BUS: 'airport_shuttle',
  //   SERVICE: 'face'
  // }

  transform(code: string | null, codeIconsDict: {}): string {
    const keyTyped = code as keyof typeof codeIconsDict;
    return codeIconsDict[keyTyped];
  }
}
