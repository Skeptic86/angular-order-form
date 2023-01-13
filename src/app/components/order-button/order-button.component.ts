import { IPriceString } from '../../interfaces/price-string.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { Component, OnInit } from '@angular/core';
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss']
})
export class OrderButtonComponent implements OnInit {

  priceString = {} as IPriceString

  
  getPriceString() {
    this.orderButtonService.getPriceString().subscribe(
      (data: IPriceString) => {
        this.priceString = {
          priceString: data.priceString
        }
      }
    )
  }

  buttonClick(): void {
    alert('Вызов такси')
  }

  ngOnInit(): void {
    this.getPriceString()
  }

  constructor(private orderButtonService: OrderButtonService) {}

}
