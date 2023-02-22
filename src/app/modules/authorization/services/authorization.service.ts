import { throwError, catchError, Observable } from 'rxjs';
import { ICode } from 'src/app/interfaces/code.interface';
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
    return this.http.post<ICode>(this.apiSendCodeURL, {
      phone: phone,
      type: type,
    });
  }

  confirmCode(code: string, token: string): Observable<any> {
    return this.http.post<ICode>(
      this.apiConfirmCodeURL,
      { code: code },
      { params: new HttpParams().set('access-token', token) }
    );
  }

  constructor(private http: HttpClient) {}
}
