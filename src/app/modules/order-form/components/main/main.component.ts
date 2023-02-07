import { AddressTypeEnum } from './../../../../enums/address-type.enum';
import { IAddress } from './../../../../interfaces/address.interface';
import { FormService } from './../../services/form/form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { distinctUntilChanged, first, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  clickEventSubscription?: Subscription;
  addressFrom?: IAddress;
  addressTo?: IAddress;

  ngOnInit(): void {
    this.formService.formInit();
    this.subscribeToState();
  }

  private subscribeToState() {
    this.clickEventSubscription = this.appStateService
      .getState()
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return (
            prev?.addressFrom === curr?.addressFrom &&
            prev?.addressTo === curr?.addressTo
          );
        })
      )
      .subscribe((value: IAppState) => {
        console.log('set value in main component', value);
        if (value?.addressFrom?.title) {
          this.addressFrom = value.addressFrom;
        } else if (value?.addressTo?.title) {
          this.addressTo = value.addressTo;
        }
      });
  }

  addressesEnum = AddressTypeEnum;

  setAddress(address: IAddress, direction: AddressTypeEnum) {
    if (
      (address?.title || address?.title === '') &&
      direction === AddressTypeEnum.From
    ) {
      this.appStateService.setAppState({ addressFrom: address });
    } else if (
      (address?.title || address?.title === '') &&
      direction === AddressTypeEnum.To
    ) {
      this.appStateService.setAppState({ addressTo: address });
    }
  }

  constructor(
    private appStateService: AppStateService,
    private formService: FormService
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.currentIndex !== event.previousIndex) {
      this.appStateService
        .getState()
        .pipe(
          first(),
          tap((value) => {
            if (value.addressFrom?.title && value.addressTo?.title) {
              const addresses: Partial<IAppState> = {
                addressTo: value.addressFrom,
                addressFrom: value.addressTo,
              };
              this.appStateService.setAppState(addresses);
              console.log(1);
            }
          })
        )
        .subscribe();
    }
  }
}
