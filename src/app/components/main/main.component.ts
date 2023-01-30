import { FormService } from './../../services/form/form.service';
import { IAddress } from 'src/app/interfaces/address.interface';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private fromAddress = '';
  private toAddress = '';

  private swapAddresses(): void {
    const temp = this.fromAddress;
    this.fromAddress = this.toAddress;
    this.toAddress = temp;
  }

  ngOnInit(): void {
    this.formService.formInit();
  }

  setAddress(address: Partial<IAppState>) {
    if (address.addressFrom?.title || address.addressFrom?.title === '') {
      this.fromAddress = address.addressFrom.title;
    } else if (address.addressTo?.title || address.addressTo?.title === '') {
      this.toAddress = address.addressTo?.title;
    }
    const addresses: Partial<IAppState> = {
      addressTo: { title: this.toAddress } as IAddress,
      addressFrom: { title: this.fromAddress } as IAddress,
    };
    this.appStateService.setAppState(addresses);
  }

  constructor(
    private appStateService: AppStateService,
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      this.swapAddresses();
      const addresses: Partial<IAppState> = {
        addressTo: { title: this.toAddress } as IAddress,
        addressFrom: { title: this.fromAddress } as IAddress,
      };
      this.appStateService.setAppState(addresses);
    }
  }
}
