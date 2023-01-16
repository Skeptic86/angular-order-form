import { AppStateService } from './../../services/app-state/app-state.service';
import { ICalcPrice } from './../../interfaces/calc-price.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss']
})
export class OrderButtonComponent implements OnInit {

  calcPrice?: ICalcPrice;

  clickEventSubscription:Subscription;

  private getPriceString() {
    return this.orderButtonService.getPriceString().subscribe(
      (data: ICalcPrice) => {
        this.calcPrice = data
      }
    )
  }

  onButtonClick(): void {
    alert('Вызов такси')
  }

  private calcPriceString() {
    this.calcPrice!.priceString = '150';
  }

  ngOnInit(): void {
    this.getPriceString()
  }

  constructor(private orderButtonService: OrderButtonService, private appStateService: AppStateService) {
    this.clickEventSubscription = this.appStateService.getClickEvent().subscribe(()=> {
      this.calcPriceString()
    })
  }

}
