import { IAddress } from './../../../../interfaces/address.interface';
import { FormService } from './../../services/form/form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { take, tap } from 'rxjs';

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
      const addressFromAppState: Partial<IAppState> = {
        addressFrom: { title: address.addressFrom.title } as IAddress,
      };
      this.appStateService.setAppState(addressFromAppState);
    } else if (address.addressTo?.title || address.addressTo?.title === '') {
      const addressToAppState: Partial<IAppState> = {
        addressTo: { title: address.addressTo.title } as IAddress,
      };
      this.appStateService.setAppState(addressToAppState);
    }
  }

  constructor(
    private appStateService: AppStateService,
    private formService: FormService
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      const currentState = this.appStateService
        .getState()
        .pipe(
          take(1),
          tap((value) => {
            const addresses: Partial<IAppState> = {
              addressTo: { title: value.addressFrom?.title! },
              addressFrom: { title: value.addressTo?.title! },
            };
            this.appStateService.setAppState(addresses);
            console.log(1);
          })
        )
        .subscribe();
    }
  }
}
