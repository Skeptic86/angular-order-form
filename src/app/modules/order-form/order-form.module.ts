import { MapModule } from './../map/map.module';
import { AutocompleteInputAddressComponent } from './components/autocomplete-input-address/autocomplete-input-address.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { PaymentChooseComponent } from './components/payment-choose/payment-choose.component';
import { OrderButtonComponent } from './components/order-button/order-button.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffCodeToIconNamePipe } from './pipes/tarrif-code-to-icon-name/tariffCodeToIconName.pipe';
import { ChoseActiveCardPipe } from './pipes/chose-active-card/chose-active-card.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { OrderFormRoutingModule } from './order-form-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    TariffCodeToIconNamePipe,
    ChoseActiveCardPipe,
    OrderButtonComponent,
    PaymentChooseComponent,
    AutocompleteInputAddressComponent,
    TariffComponent,
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
    HttpClientModule,
    DragDropModule,
    OrderFormRoutingModule,
    MapModule,
  ],
})
export class OrderFormModule {}
