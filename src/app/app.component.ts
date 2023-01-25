import { AppStateService } from './services/app-state/app-state.service';
import { IAppState } from './interfaces/app-state.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddressTypeEnum } from './enums/address-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'order-form';

  private fromAddress = '';
  private toAddress = '';

  private swapAddresses(): void {
    const temp = this.fromAddress;
    this.fromAddress = this.toAddress;
    this.toAddress = temp;
  }

  setAddress(address: Partial<IAppState>) {
    if (address.addressFrom) {
      this.fromAddress = address.addressFrom;
    } else if (address.addressTo) {
      this.toAddress = address.addressTo;
    }
    const addresses: Partial<IAppState> = {
      addressTo: this.toAddress,
      addressFrom: this.fromAddress,
    };
    this.appStateService.setAppState(addresses);
  }

  constructor(private appStateService: AppStateService) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      this.swapAddresses();
      const addresses: Partial<IAppState> = {
        addressFrom: this.fromAddress,
        addressTo: this.toAddress,
      };
      this.appStateService.setAppState(addresses);
    }
  }
}
