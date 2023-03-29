import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { IAddress } from 'src/app/interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAddressesService {
  private readonly jsonURL = 'http://localhost:3000/addresses';

  private readonly apiURL = 'https://dev-api.taxsee.com/client/v1/addresses';

  getAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(this.jsonURL);
  }

  getAddressesApi(queryTitle?: string | null): Observable<Object | IAddress[]> {
    if (queryTitle) {
      const params = new HttpParams().set('q', queryTitle);
      return this.http.get<IAddress[]>(this.apiURL, { params: params });
    } else {
      return this.http.get(this.apiURL);
    }
  }

  constructor(private http: HttpClient) {}
}
