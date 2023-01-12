import { TariffService } from './../../services/tariff/tariff.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent {

  
  arr = this.getTariffArr()
  icon = ''

  getTariffArr() {
    return this.tariffService.getTariffArr()
  }

  ngOnInit() {
    this.icon = this.arr[0].icon
  }

  constructor(private tariffService:TariffService) {

  }

}
