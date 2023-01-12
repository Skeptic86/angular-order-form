import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import {Component} from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss']
})
export class PaymentChooseComponent {
  @Input() index_!:number 

  payment = this.paymentChooseService.getPayment()
  tarrif = this.paymentChooseService.getTarrif()
  arr = [this.payment, this.tarrif]
  
  selected = ''

  ngOnInit() {
    this.selected = this.arr[this.index_][0].value;
  }

  constructor(private paymentChooseService: PaymentChooseService ) {}

}
