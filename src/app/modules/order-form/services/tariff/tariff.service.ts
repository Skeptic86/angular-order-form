import { IDefault } from 'src/app/interfaces/default.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TariffService {
  private readonly jsonURL = 'http://localhost:3000/defaults';
  private readonly apiURL = 'https://dev-api.taxsee.com/client/v1/defaults';

  getDefaultsApi(): Observable<IDefault> {
    const params = new HttpParams().set('expand', 'info.tariffGroups.tariffs');
    return this.http.get<IDefault>(this.apiURL, { params: params });
  }

  getDefaults(): Observable<IDefault> {
    return this.http.get<IDefault>(this.jsonURL);
  }

  constructor(private http: HttpClient) {}
}
