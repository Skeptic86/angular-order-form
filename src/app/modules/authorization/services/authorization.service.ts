import { throwError, catchError } from 'rxjs';
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

  sendCode(phone: string, type: number) {
    // const params = new HttpParams().set('phone', phone).set('type', type);
    return this.http
      .post<ICode>(this.apiSendCodeURL, { phone: phone, type: type })
      .pipe(catchError(this.handleError));
  }

  confirmCode(code: string) {
    const params = new HttpParams().set('code', code);
    return this.http
      .post<ICode>(this.apiConfirmCodeURL, { params: params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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
