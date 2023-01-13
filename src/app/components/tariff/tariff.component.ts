import { ITariffDefalut } from '../../interfaces/tariff-default';
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

  getTariffGroups() {
    return this.tariffService.getTariffGroups()
  }

  codeIcons = {
    'CAR': 'directions_car',
    'DELIVERY': 'shopping_bag',
    'TRUCK': 'local_shipping',
    'BUS': 'airport_shuttle',
    'SERVICE': 'face'
  }

  getTariffGroupsHttp() {
    return this.tariffService.getTariffGroupsHttp()
    .subscribe((data: ITariffDefalut) => {
      this.data = {
        base: data.base,
        address: data.address,
        info: data.info
      }
      console.log(this.data)
    })
  }

  ngOnInit() {
    this.icon = this.tariffGroups[0].icon
    this.getTariffGroupsHttp()
  }

  changeIcon(iconName:string) {
    this.icon = iconName
  }

  constructor(private tariffService:TariffService) {

  }

}
