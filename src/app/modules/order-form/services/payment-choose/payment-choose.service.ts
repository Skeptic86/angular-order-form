import { IPayment } from './../../../../interfaces/payment.interface';
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
    return this.http
      .get<IPayment>(this.jsonURL)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  constructor(private http: HttpClient) {}
}
