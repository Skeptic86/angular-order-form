import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentChooseService {

 

  payment = [
    {value: 'account_balance_wallet'},
    {value: 'payment'}
  ]


  tarrif = [
    {value: 'car_crash'},
    {value: 'car_rental'}
  ]

  arr = [this.payment, this.tarrif]

  getPayment() {
    return this.payment
  }

  getTarrif() {
    return this.tarrif
  }

  constructor() { }
}
