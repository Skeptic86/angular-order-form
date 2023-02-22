import { ICountry } from './../../../../interfaces/country.interface';
import { Observable, tap } from 'rxjs';
import { CountryService } from './../../services/country/country.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent {
  @Output() selectedCountryEvent = new EventEmitter<ICountry>();
  @Input() countries?: ICountry[];
  selectedCountry?: ICountry;

  sendSelectedCountry(): void {
    this.selectedCountryEvent.emit(this.selectedCountry);
  }

  constructor(private countryService: CountryService) {}
}
