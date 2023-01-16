import { IPayment } from './../../interfaces/payment.interface';
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

  payment: IPayment = {} as IPayment 
  icon = ''
  selected = ''


  codeIcons = {
    Card: 'credit_card',
    Cash: 'account_balance_wallet',
    Sberbank: 'send_to_mobile'
  }

  changeIcon(iconName:string) {
    const keyTyped = iconName as keyof typeof this.codeIcons
    this.icon = this.codeIcons[keyTyped]
  }


  getPayment() {
    this.paymentChooseService.getPayment()
    .subscribe((data: IPayment) => {
      this.payment = data
      this.changeIcon(this.payment.paymentMethods[0].type)
    })
  }

  ngOnInit() {
    this.getPayment()
  }

  constructor(private paymentChooseService: PaymentChooseService ) {}

}
