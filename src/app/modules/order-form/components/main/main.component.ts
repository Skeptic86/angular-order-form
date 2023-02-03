import { IAddress } from './../../../../interfaces/address.interface';
import { FormService } from './../../services/form/form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { first, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    this.formService.formInit();
  }

  setAddress(address: Partial<IAppState>) {
    if (address.addressFrom?.title || address.addressFrom?.title === '') {
      const addressFromAppState: Partial<IAppState> = {
        addressFrom: {
          title: address.addressFrom.title,
          longitude: address.addressFrom.longitude,
          latitude: address.addressFrom.latitude,
        } as IAddress,
      };
      this.appStateService.setAppState(addressFromAppState);
    } else if (address.addressTo?.title || address.addressTo?.title === '') {
      const addressToAppState: Partial<IAppState> = {
        addressTo: {
          title: address.addressTo.title,
          longitude: address.addressTo.longitude,
          latitude: address.addressTo.latitude,
        } as IAddress,
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
      this.appStateService
        .getState()
        .pipe(
          first(),
          tap((value) => {
            const addresses: Partial<IAppState> = {
              addressTo: {
                title: value.addressFrom?.title!,
                longitude: value.addressFrom?.longitude!,
                latitude: value.addressFrom?.latitude!,
              },
              addressFrom: {
                title: value.addressTo?.title!,
                longitude: value.addressTo?.longitude!,
                latitude: value.addressTo?.latitude!,
              },
            };
            this.appStateService.setAppState(addresses);
            console.log(1);
          })
        )
        .subscribe();
    }
  }
}
