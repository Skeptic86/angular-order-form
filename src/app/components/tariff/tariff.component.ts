import { ITariffDefalut } from '../../interfaces/tariff-default.interface';
import { ITariffGroupInfo } from '../../interfaces/tariff-group-info.interface';
import { TariffService } from './../../services/tariff/tariff.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit{

  
  tariffGroups = this.getTariffGroups()
  data = {} as ITariffDefalut
  icon = ''

  codeIcons = {
    CAR: 'directions_car',
    DELIVERY: 'shopping_bag',
    TRUCK: 'local_shipping',
    BUS: 'airport_shuttle',
    SERVICE: 'face'
  }

  getTariffGroups() {
    return this.tariffService.getTariffGroups()
  }

 
  getTariffGroupsHttp() {
    return this.tariffService.getTariffGroupsHttp()
    .subscribe((data: ITariffDefalut) => {
      this.data = {
        base: data.base,
        address: data.address,
        info: data.info
      }
    })
  }

  ngOnInit() {
    this.icon = this.tariffGroups[0].icon
    this.getTariffGroupsHttp()
  }

  changeIcon(iconName:string) {
    const keyTyped = iconName as keyof typeof this.codeIcons
    this.icon = this.codeIcons[keyTyped]
  }

  constructor(private tariffService:TariffService) {

  }

}
