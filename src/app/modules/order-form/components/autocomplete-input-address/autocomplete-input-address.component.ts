import { ActivatedRoute } from '@angular/router';
import { AddressTypeEnum } from './../../../../enums/address-type.enum';
import { IAppState } from './../../../../interfaces/app-state.interface';
import { IAddress } from '../../../../interfaces/address.interface';
import { CompleteService } from '../../services/complete/complete.service';
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

  inputValue = '';

  sendAddress(value: Partial<IAppState>) {
    this.sendAddressEvent.emit(value);
  }

  private getAddresses() {
    return this.completeService.getAddresses().subscribe((data) => {
      this.addresses = data as IAddress[];
    });
  }

  ngOnInit() {
    this.getAddresses();
    this.filteredAddresses = this.autocompleteInput.valueChanges.pipe(
      debounceTime(2000),
      tap((value) => {
        this.getPriceService.sendClickEvent();
        if (this.direction === AddressTypeEnum.To) {
          this.sendAddress({ addressTo: { title: value } as IAddress });
        } else if (this.direction === AddressTypeEnum.From) {
          this.sendAddress({ addressFrom: { title: value } as IAddress });
        }
      }),
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): IAddress[] {
    const filterValue = value.toLowerCase();
    return this.addresses.filter((address) =>
      address.title!.toLowerCase().includes(filterValue)
    );
  }

  constructor(
    private completeService: CompleteService,
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
            console.log(value);
          } else {
            this.inputValue = value!.addressFrom!.title!;
            console.log(value);
          }
        }
      });
  }
}
