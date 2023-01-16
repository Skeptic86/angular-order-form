import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteInputAddressComponent } from './components/autocomplete-input-address/autocomplete-input-address.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { OrderButtonComponent } from './components/order-button/order-button.component';
import {MatButtonModule} from '@angular/material/button';
import { PaymentChooseComponent } from './components/payment-choose/payment-choose.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { TariffComponent } from './components/tariff/tariff.component';
import { TariffCodeToIconNamePipe } from './pipes/tarrif-code-to-icon-name/tariffCodeToIconName.pipe';
import { ChoseActiveCardPipe } from './pipes/chose-active-card/chose-active-card.pipe';






@NgModule({
  declarations: [
    AppComponent,
    AutocompleteInputAddressComponent,
    OrderButtonComponent,
    PaymentChooseComponent,
    TariffComponent,
    TariffCodeToIconNamePipe,
    ChoseActiveCardPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
