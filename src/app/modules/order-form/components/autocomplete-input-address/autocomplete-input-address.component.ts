import { ActivatedRoute } from '@angular/router';
import { AddressTypeEnum } from './../../../../enums/address-type.enum';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { IAddress } from '../../../../interfaces/address.interface';
import { GetAddressesService } from '../../services/get-addresses/get-addresses.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { GetPriceService } from 'src/app/modules/order-form/services/get-price/get-price.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';

@Component({
  selector: 'app-autocomplete-input-address',
  templateUrl: './autocomplete-input-address.component.html',
  styleUrls: ['./autocomplete-input-address.component.scss'],
})
export class AutocompleteInputAddressComponent implements OnInit {
  @Input() placeholderText?: string;
  @Input() direction?: string;
  @Output() sendAddressEvent = new EventEmitter<Partial<IAppState>>();
  autocompleteInput = new FormControl('');
  private addresses: IAddress[] = [];
  filteredAddresses!: Observable<IAddress[]>;
  clickEventSubscription: Subscription;
  data$?: any;

  inputValue = '';

  sendAddress(value: Partial<IAppState>) {
    this.sendAddressEvent.emit(value);
  }

  private getAddressesApi(queryTitle: string | null) {
    return this.getAddressesService.getAddressesApi(queryTitle);
  }

  private getAddresses() {
    return this.getAddressesService.getAddresses().subscribe((data) => {
      this.addresses = data as IAddress[];
    });
  }

  private findLngLatViaTitle(title: string | null) {
    const address = this.addresses.find((address) => address.title === title);
    if (address && title) {
      return [address?.longitude, address?.latitude];
    } else {
      return [65.53553704887027, 57.15114882108171];
    }
  }

  ngOnInit() {
    this.getAddresses();
    this.autocompleteInput.valueChanges
      .pipe(
        debounceTime(1500),
        tap((value) => {
          this.getPriceService.sendClickEvent();
          const lngLat = this.findLngLatViaTitle(value);
          if (this.direction === AddressTypeEnum.To) {
            this.sendAddress({
              addressTo: {
                title: value,
                longitude: lngLat[0],
                latitude: lngLat[1],
              } as IAddress,
            });
          } else if (this.direction === AddressTypeEnum.From) {
            this.sendAddress({
              addressFrom: {
                title: value,
                longitude: lngLat[0],
                latitude: lngLat[1],
              } as IAddress,
            });
          }
        }),
        startWith('')
      )
      .subscribe((value) => {
        this.filteredAddresses = this.getAddressesApi(value) as Observable<
          IAddress[]
        >;
      });
  }

  // private _filter(value: string): IAddress[] {
  // const filterValue = value.toLowerCase();
  // return this.addresses.filter((address) =>
  // address.title!.toLowerCase().includes(filterValue)
  // );
  // }

  constructor(
    private getAddressesService: GetAddressesService,
    private getPriceService: GetPriceService,
    private appStateService: AppStateService
  ) {
    this.clickEventSubscription = this.appStateService
      .getState()
      .pipe(
        distinctUntilChanged((prev, curr) => {
          if (this.direction === AddressTypeEnum.To) {
            return prev?.addressTo?.title === curr?.addressTo?.title;
          } else {
            return prev?.addressFrom?.title === curr?.addressFrom?.title;
          }
        })
      )
      .subscribe((value: IAppState) => {
        if (value?.addressFrom?.title || value?.addressTo?.title) {
          if (this.direction === AddressTypeEnum.To) {
            this.inputValue = value!.addressTo!.title!;
          } else {
            this.inputValue = value!.addressFrom!.title!;
          }
        }
      });
  }
}
