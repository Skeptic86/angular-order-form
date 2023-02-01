import { IDefault } from '../../../../interfaces/default.interface';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TariffService {
  private readonly jsonURL = 'http://localhost:3000/defaults';

  getTariffGroupsInfo() {
    return this.http
      .get<IDefault>(this.jsonURL)
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

  // tariffGroups = [
  //   {
  //     value: 'cars',
  //     title: 'Легковые',
  //     icon: 'directions_car',
  //     types: [
  //       'Эконом',
  //       'Комфорт',
  //       'Бизнес',
  //       'Компактвэн, 6 мест',
  //       'Минивэн, 7 мест',
  //       'Почасовая оплата'
  //     ]
  //   },
  //   {
  //     value: 'shipping',
  //     title: 'Доставка',
  //     icon: 'shopping_bag',
  //     types: [
  //       'Курьер',
  //       'Купим и привезем'
  //     ]
  //   },
  //   {
  //     value: 'heavy_cars',
  //     title: 'Грузовые',
  //     icon: 'local_shipping',
  //     types: [
  //       'Маленький кузов',
  //       'Стандартный кузов',
  //       'Стандартный кузов + 1 грузчик',
  //       'Стандартный кузов + 2 грузчика',
  //       'Удлиненный кузов'
  //     ]
  //   },
  //   {
  //     value: 'buses',
  //     title: 'Автобусы',
  //     icon: 'airport_shuttle',
  //     types: [
  //       'Автобус до 13 мест',
  //       'Автобус до 20 мест'
  //     ]
  //   },
  //   {
  //     value: 'service',
  //     title: 'Услуги',
  //     icon: 'face',
  //     types: [
  //       'Грузчик',
  //       'Личный водитель',
  //       'Буксировка',
  //       'Запуск двигателя'
  //     ]
  //   },
  // ]

  // getTariffGroups() {
  //   return this.tariffGroups;
  // }

  constructor(private http: HttpClient) {}
}
