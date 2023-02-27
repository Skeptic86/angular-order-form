import { AuthorizationModule } from './../authorization/authorization.module';
import { MapModule } from './../map/map.module';
import { AutocompleteInputAddressComponent } from './components/autocomplete-input-address/autocomplete-input-address.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { OrderButtonComponent } from './components/order-button/order-button.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffCodeToIconNamePipe } from './pipes/tarrif-code-to-icon-name/tariffCodeToIconName.pipe';
import { ChoseActiveCardPipe } from './pipes/chose-active-card/chose-active-card.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { OrderFormRoutingModule } from './order-form-routing.module';
import { TariffIconPipe } from './pipes/tariff-icon/tariff-icon.pipe';
import { PaymentIconPipe } from './pipes/payment-icon/payment-icon.pipe';
import { ErrorAuthorizationComponent } from './components/error-authorization/error-authorization.component';
import { OptionChooseComponent } from './components/option-choose/option-choose.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { BaseSelectComponent } from './components/base-select/base-select.component';
import { DoneButtonComponent } from './components/done-button/done-button.component';

@NgModule({
  declarations: [
    MainComponent,
    TariffCodeToIconNamePipe,
    ChoseActiveCardPipe,
    OrderButtonComponent,
    AutocompleteInputAddressComponent,
    TariffComponent,
    TariffIconPipe,
    PaymentIconPipe,
    ErrorAuthorizationComponent,
    OptionChooseComponent,
    CountrySelectComponent,
    BaseSelectComponent,
    DoneButtonComponent,
  ],
  exports: [MainComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule,
    OrderFormRoutingModule,
    MapModule,
    AuthorizationModule,
  ],
})
export class OrderFormModule {}
