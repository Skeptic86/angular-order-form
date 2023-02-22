import { ICountry } from './../../../../interfaces/country.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  readonly apiURL = 'https://dev-api.taxsee.com/client/v1/countries';

  getCountriesApi(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.apiURL);
  }

  constructor(private http: HttpClient) {}
}
