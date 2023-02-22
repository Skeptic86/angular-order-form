import { IPayment } from 'src/app/interfaces/payment.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentChooseService {
  payment: IPayment = {} as IPayment;

  private readonly jsonURL = 'http://localhost:3000/authInfo';

  getPayment(): Observable<IPayment> {
    return this.http.get<IPayment>(this.jsonURL);
  }

  constructor(private http: HttpClient) {}
}
