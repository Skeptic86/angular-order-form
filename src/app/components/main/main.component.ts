import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private fromAddress = '';
  private toAddress = '';

  private swapAddresses(): void {
    const temp = this.fromAddress;
    this.fromAddress = this.toAddress;
    this.toAddress = temp;
  }

  setAddress(address: Partial<IAppState>) {
    if (address.addressFrom || address.addressFrom === '') {
      this.fromAddress = address.addressFrom;
    } else if (address.addressTo || address.addressTo === '') {
      this.toAddress = address.addressTo;
    }
    const addresses: Partial<IAppState> = {
      addressTo: this.toAddress,
      addressFrom: this.fromAddress,
    };
    this.appStateService.setAppState(addresses);
  }

  constructor(
    private appStateService: AppStateService,
    private route: ActivatedRoute
  ) {}

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
