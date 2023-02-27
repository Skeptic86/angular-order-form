import { ICountry } from './../../../../interfaces/country.interface';
import { count, Observable, tap } from 'rxjs';
import { CountryService } from './../../services/country/country.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent implements OnInit {
  @Output() selectedCountryEvent = new EventEmitter<string>();
  @Input() countries?: ICountry[];
  selectedCountry = 'ru';

  sendSelectedCountry(): void {
    this.selectedCountryEvent.emit(this.selectedCountry);
  }

  ngOnInit(): void {
    this.sendSelectedCountry();
  }

  constructor(private countryService: CountryService) {}
}
