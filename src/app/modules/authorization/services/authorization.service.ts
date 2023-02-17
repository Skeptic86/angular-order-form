import { throwError, catchError, Observable } from 'rxjs';
import { ICode } from './../../../interfaces/code.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private apiSendCodeURL =
    'https://dev-api.taxsee.com/client/v1/auth/send-code';

  private apiConfirmCodeURL =
    'https://dev-api.taxsee.com/client/v1/auth/confirm-code';

  sendCode(phone: string, type: number): Observable<ICode> {
    // const params = new HttpParams().set('phone', phone).set('type', type);
    console.log(phone, type);
    return this.http
      .post<ICode>(this.apiSendCodeURL, { phone: phone, type: type })
      .pipe(catchError(this.handleError));
  }

  confirmCode(code: string): Observable<any> {
    return this.http
      .post<ICode>(this.apiConfirmCodeURL, { code: code })
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
