import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { GetPriceService } from '../../services/get-price/get-price.service';
import { ICalcPrice } from './../../../../interfaces/calc-price.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss'],
})
export class OrderButtonComponent implements OnInit {
  calcPrice?: ICalcPrice;
  disabled: boolean = false;

  clickEventSubscription: Subscription;

  private getPriceString() {
    return this.orderButtonService
      .getPriceString()
      .subscribe((data: ICalcPrice) => {
        this.calcPrice = data;
      });
  }

  onButtonClick(): void {
    alert('Вызов такси');
  }

  ngOnInit(): void {
    this.getPriceString();
  }

  constructor(
    private orderButtonService: OrderButtonService,
    private getPriceService: GetPriceService,
    private appStateService: AppStateService
  ) {
    this.clickEventSubscription = this.getPriceService
      .getClickEvent()
      .subscribe(() => {
        this.getPriceString();
        // if (
        //   this.appStateService.getStateValue().addressFrom?.title &&
        //   this.appStateService.getStateValue().addressTo?.title &&
        //   this.appStateService.getStateValue().payment?.name &&
        //   this.appStateService.getStateValue().tariff?.name
        // ) {
        //   this.disabled = false;
        // } else {
        //   this.disabled = true;
        // }
      });
  }
}
