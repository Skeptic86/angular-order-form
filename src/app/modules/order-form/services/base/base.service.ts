import { IBase } from './../../../../interfaces/base.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from 'src/app/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  readonly apiURL = 'https://dev-api.taxsee.com/client/v1/bases';

  getBasesApi(countryCode: string): Observable<IBase[]> {
    return this.http.get<IBase[]>(this.apiURL, {
      params: { country: countryCode },
    });
  }

  constructor(private http: HttpClient) {}
}
