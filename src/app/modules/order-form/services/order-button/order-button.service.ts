import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { ICalcPrice } from 'src/app/interfaces/calc-price.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderButtonService {
  private readonly jsonURL = 'http://localhost:3000/ordersCalc';
  private readonly apiURL = 'https://dev-api.taxsee.com/client/v1/orders/calc';

  getPriceString(): Observable<ICalcPrice> {
    return this.http.get<ICalcPrice>(this.jsonURL);
  }

  getPriceStringApi(): Observable<ICalcPrice> {
    return this.http.post<ICalcPrice>(this.apiURL, {
      time: null,
      tariffClasses: [this.appStateService.getStateValue().tariff?.classId],
      base: this.appStateService.getStateValue().baseId,
      services: [],
      addresses: [this.appStateService.getStateValue().addressFrom],
      guid: '0cb91e27-f2a0-43b1-b806-2ce51060229b',
    });
  }

  constructor(
    private http: HttpClient,
    private appStateService: AppStateService
  ) {}
}
