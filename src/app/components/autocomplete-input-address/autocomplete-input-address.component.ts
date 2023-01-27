import { ActivatedRoute } from '@angular/router';
import { AddressTypeEnum } from './../../enums/address-type.enum';
import { IAppState } from './../../interfaces/app-state.interface';
import { IAddress } from '../../interfaces/address.interface';
import { CompleteService } from '../../services/complete/complete.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  startWith,
} from 'rxjs/operators';
import { GetPriceService } from 'src/app/services/get-price/get-price.service';
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
  private options: IAddress[] = [];
  filteredOptions!: Observable<IAddress[]>;
  clickEventSubscription: Subscription;

  value = '';

  sendAddress(value: Partial<IAppState>) {
    this.sendAddressEvent.emit(value);
  }

  private getOptions() {
    return this.completeService.getOptions().subscribe((data) => {
      this.options = data as IAddress[];
    });
  }

  ngOnInit() {
    this.getOptions();
    this.filteredOptions = this.autocompleteInput.valueChanges.pipe(
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
    return this.options.filter((option) =>
      option.title!.toLowerCase().includes(filterValue)
    );
  }

  constructor(
    private completeService: CompleteService,
    private getPriceService: GetPriceService,
    private appStateService: AppStateService,
    private route: ActivatedRoute
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
      .subscribe((value) => {
        if (value?.addressFrom || value?.addressTo) {
          if (this.direction === AddressTypeEnum.To) {
            this.value = value?.addressTo!.title!;
            console.log(value);
          } else {
            this.value = value?.addressFrom!.title!;
            console.log(value);
          }
        }
      });
  }
}
