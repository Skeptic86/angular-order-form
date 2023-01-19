import { IAppState } from './interfaces/app-state.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

enum AddressTypeEnum {
  To = 'to',
  From = 'from',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'order-form';
  temp = '';

  fromAddress = '';
  toAddress = '';

  setAddress(address: Partial<IAppState>) {
    if (address.addressFrom) {
      this.fromAddress = address.addressFrom;
    } else if (address.addressTo) {
      this.toAddress = address.addressTo;
    }
    alert(this.toAddress);
  }

  ngOnInit(): void {
    // this.addFromAddress()
  }

  drop(event: CdkDragDrop<string[]>) {
    this.temp = this.fromAddress;
    this.fromAddress = this.toAddress;
    this.toAddress = this.temp;
  }
}
