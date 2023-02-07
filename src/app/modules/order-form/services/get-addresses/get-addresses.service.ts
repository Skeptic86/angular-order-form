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
  options: string[] = ['One', 'Two', 'Three'];

  // getOptions(): string[] {
  //   return this.options;
  // }

  private readonly jsonURL = 'http://localhost:3000/addresses';

  private readonly jsonURLApi =
    'https://dev-api.taxsee.com/client/v1/addresses';

  getAddresses() {
    return this.http
      .get<IAddress[]>(this.jsonURL)
      .pipe(catchError(this.handleError));
  }

  getAddressesApi(queryTitle?: string | null) {
    if (queryTitle) {
      const params = new HttpParams().set('q', queryTitle);
      return this.http
        .get<IAddress[]>(this.jsonURLApi, { params: params })
        .pipe(catchError(this.handleError));
    } else {
      return this.http.get(this.jsonURLApi).pipe(catchError(this.handleError));
    }
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
