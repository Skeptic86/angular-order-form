import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentChooseService {

 

  payment = [
    {value: 'account_balance_wallet', str: 'Наличные'},
    {value: 'payment', str: 'Карта'}
  ]


  tarrif = [
    {value: 'car_crash', str: 'Эконом'},
    {value: 'car_rental', str: 'Комфорт'}
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
