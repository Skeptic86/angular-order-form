import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss']
})
export class PaymentChooseComponent implements OnInit{
  @Input() index_!:number 

  payment = this.paymentChooseService.getPayment()
  tarrif = this.paymentChooseService.getTarrif()
  arr = [this.payment, this.tarrif]
  icon = ''
  selected = ''

  buttonClick(iconName: string) {
    this.icon = iconName;
  }

  ngOnInit() {
    this.selected = this.arr[this.index_][0].value;
    this.icon = this.arr[this.index_][0].value;
  }

  constructor(private paymentChooseService: PaymentChooseService ) {}

}
