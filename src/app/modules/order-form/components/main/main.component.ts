import { ICalcPrice } from 'src/app/interfaces/calc-price.interface';
import { OrderButtonService } from './../../services/order-button/order-button.service';
import { GetPriceService } from './../../services/get-price/get-price.service';
import { BaseService } from './../../services/base/base.service';
import { CountryService } from './../../services/country/country.service';
import { ICountry } from './../../../../interfaces/country.interface';
import { IDefault } from 'src/app/interfaces/default.interface';
import { ITariff } from 'src/app/interfaces/tariff.interface';
import { ActivatedRoute } from '@angular/router';
import { AddressTypeEnum } from 'src/app/enums/address-type.enum';
import { IAddress } from 'src/app/interfaces/address.interface';
import { FormService } from './../../services/form/form.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from 'src/app/interfaces/app-state.interface';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import {
  count,
  distinctUntilChanged,
  filter,
  first,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { TariffService } from '../../services/tariff/tariff.service';
import { IPayment, IPaymentMethod } from 'src/app/interfaces/payment.interface';
import { PaymentChooseService } from './../../services/payment-choose/payment-choose.service';
import { IBase } from 'src/app/interfaces/base.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  addressesSubscription?: Subscription;
  addressFrom?: IAddress;
  addressTo?: IAddress;
  readonly paymentMethod$ = this.paymentChanged();
  readonly payment$ = this.getPayment();
  readonly tariff$ = this.tariffChanged();
  readonly defaults$ = this.getDefaults();
  readonly countries$ = this.getCountries();
  calcPrice?: ICalcPrice;
  bases$?: IBase[];
  selectedBaseId?: number;
  selectedCountryCode = 'ru';
  showCountries = false;
  clickEventSubscription: Subscription;

  private getCountries(): Observable<ICountry[]> {
    return this.countryService.getCountriesApi();
  }

  doneButtonClick(): void {
    this.showCountries = false;
  }

  selectBaseId(baseId: number): void {
    this.selectedBaseId = baseId;
    this.appStateService.setAppState({ baseId: baseId });
  }

  selectCountry(countryCode: string): void {
    this.selectedCountryCode = countryCode;
    this.getBases(countryCode).subscribe((value) => (this.bases$ = value));
  }

  private getBases(countryCode: string): Observable<IBase[]> {
    return this.baseService.getBasesApi(countryCode);
  }

  toggleShowCountries(): void {
    this.showCountries = !this.showCountries;
  }

  private getPayment(): Observable<IPayment> {
    return this.paymentChooseService.getPayment().pipe(
      tap((value) => {
        if (!this.appStateService.getStateValue().payment?.name) {
          this.appStateService.setAppState({
            payment: value.paymentMethods[0],
          });
        }
      })
    );
  }

  private paymentChanged(): Observable<IPaymentMethod | undefined> {
    return this.appStateService.getState().pipe(
      filter((value) => !!value.payment),
      map((value) => {
        return value.payment;
      }),
      distinctUntilChanged((prev, curr) => {
        return prev!.type === curr!.type;
      })
    );
  }

  private tariffChanged(): Observable<ITariff | undefined> {
    return this.appStateService.getState().pipe(
      map((value) => {
        return value.tariff;
      }),
      filter((value) => !!value),
      distinctUntilChanged((prev, curr) => {
        return prev!.classId === curr!.classId;
      })
    );
  }

  private getDefaults(): Observable<IDefault> {
    return this.tariffService.getDefaultsApi().pipe(
      tap((value) => {
        if (!this.appStateService.getStateValue().tariff?.classId) {
          this.appStateService.setAppState({
            tariff: value.info.tariffGroups[0].tariffs[0],
          });
        }
      })
    );
  }

  ngOnInit(): void {
    this.formService.formInit();
    this.subscribeToState();
    this.route.queryParamMap.subscribe();
    this.getPriceString().subscribe((data: ICalcPrice) => {
      this.calcPrice = data;
    });
  }

  private subscribeToState(): void {
    this.addressesSubscription = this.appStateService
      .getState()
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return (
            prev?.addressFrom?.title === curr?.addressFrom?.title &&
            prev?.addressTo?.title === curr?.addressTo?.title
          );
        })
      )
      .subscribe((value: IAppState) => {
        if (value?.addressFrom?.title || value?.addressFrom?.title === '') {
          this.addressFrom = value.addressFrom;
        }
        if (value?.addressTo?.title || value?.addressTo?.title === '') {
          this.addressTo = value.addressTo;
        }
      });
  }

  addressesEnum = AddressTypeEnum;

  setAddress(address: IAddress, direction: AddressTypeEnum): void {
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

  private getPriceString(): Observable<ICalcPrice> {
    return this.orderButtonService.getPriceStringApi();
  }

  constructor(
    private appStateService: AppStateService,
    private formService: FormService,
    private route: ActivatedRoute,
    private tariffService: TariffService,
    private paymentChooseService: PaymentChooseService,
    private countryService: CountryService,
    private baseService: BaseService,
    private getPriceService: GetPriceService,
    private orderButtonService: OrderButtonService
  ) {
    this.appStateService.getState().subscribe((value) => {
      this.selectedBaseId = value.baseId;
    });
    this.clickEventSubscription = this.getPriceService
      .getClickEvent()
      .pipe(switchMap((data) => this.getPriceString()))
      .subscribe((data: ICalcPrice) => {
        this.calcPrice = data;
      });
  }

  drop(event: CdkDragDrop<string[]>): void {
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
            }
          })
        )
        .subscribe();
    }
  }
}
