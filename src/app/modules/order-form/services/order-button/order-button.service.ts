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
    const address = this.appStateService.getStateValue().addressFrom?.title
      ? this.appStateService.getStateValue().addressFrom
      : {
          title: 'Пролетарская улица 61А',
          subtitle: '',
          isQuick: false,
          isPlace: false,
          isFull: true,
          place: {
            id: 1,
            name: 'Курган',
            description: 'Курганская область, городской округ Курган, город',
          },
          quick: { id: null, name: null },
          street: { id: 100415, name: 'Пролетарская улица' },
          zone: { id: 3098878, name: null },
          house: '61А',
          latitude: 55.445465,
          longitude: 65.34778,
          comment: null,
          isCoordinates: false,
        };
    return this.http.post<ICalcPrice>(this.apiURL, {
      time: null,
      tariffClasses: [
        this.appStateService.getStateValue().tariff?.classId || 1,
      ],
      base: this.appStateService.getStateValue().baseId,
      services: [],
      addresses: [address],
      guid: '0cb91e27-f2a0-43b1-b806-2ce51060229b',
    });
  }

  constructor(
    private http: HttpClient,
    private appStateService: AppStateService
  ) {}
}
