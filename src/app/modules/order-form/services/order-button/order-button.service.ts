import { ICalcPrice } from 'src/app/interfaces/calc-price.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderButtonService {
  private readonly jsonURL = 'http://localhost:3000/ordersCalc';

  getPriceString(): Observable<ICalcPrice> {
    return this.http.get<ICalcPrice>(this.jsonURL);
  }

  constructor(private http: HttpClient) {}
}
