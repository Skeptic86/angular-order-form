import { Component } from '@angular/core';

@Component({
  selector: 'app-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.scss']
})
export class OrderButtonComponent {

  buttonClick(): void {
    alert('Вызов такси')
  }

}
