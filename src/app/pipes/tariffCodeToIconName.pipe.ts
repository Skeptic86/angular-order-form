import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tariffCodeToIconName'
})
export class tariffCodeToIconNamePipe implements PipeTransform {

  codeIcons = {
    CAR: 'directions_car',
    DELIVERY: 'shopping_bag',
    TRUCK: 'local_shipping',
    BUS: 'airport_shuttle',
    SERVICE: 'face'
  }

  transform(code:string): string {
    const keyTyped = code as keyof typeof this.codeIcons
    return this.codeIcons[keyTyped]
  }

}
