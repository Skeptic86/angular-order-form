import { ActivatedRoute } from '@angular/router';
import { AddressTypeEnum } from './../../../../enums/address-type.enum';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { IAddress } from '../../../../interfaces/address.interface';
import { GetAddressesService } from '../../services/get-addresses/get-addresses.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
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
export class AutocompleteInputAddressComponent implements OnInit, OnChanges {
  @Input() placeholderText?: string;
  @Input() addressInput?: IAddress;
  @Output() sendAddressEvent = new EventEmitter<IAddress>();
  autocompleteInput = new FormControl('');
  private addresses: IAddress[] = [];
  filteredAddresses!: Observable<IAddress[]>;

  addressSelected(address: IAddress) {
    this.sendAddress(address);
  }

  clearInput() {
    this.inputValue = '';
    this.addressSelected({ title: '' } as IAddress);
  }

  inputValue = '';

  sendAddress(value: IAddress) {
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
    const address = this.appStateService.getStateValue().addressFrom;
    if (address?.title) {
      return [address?.longitude, address?.latitude];
    } else {
      return [65.53553704887027, 57.15114882108171];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const address = changes['addressInput'].currentValue as IAddress;
    if (address?.title) {
      console.log('value changes, addressInput: ', address);
      this.inputValue = address.title;
    }
  }

  ngOnInit() {
    this.getAddresses();
    this.autocompleteInput.valueChanges
      .pipe(
        debounceTime(1500),
        filter((value) => value!.length >= 3),
        tap((value) => {
          this.getPriceService.sendClickEvent();
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
  ) {}
}
