import {Component} from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-payment-choose',
  templateUrl: './payment-choose.component.html',
  styleUrls: ['./payment-choose.component.scss']
})
export class PaymentChooseComponent {

  selected = "attach_money";

}
