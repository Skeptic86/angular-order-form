import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { IAppState } from './../../interfaces/app-state.interface';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppstateResolver implements Resolve<IAppState> {
  constructor(private appStateService: AppStateService) {}

  private ConvertStringToNumber(input: string | null) {
    if (!input || input.trim().length == 0) return NaN;
    return Number(input);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IAppState> | Promise<IAppState> | IAppState {
    const paramState: IAppState = {
      tariff: {
        classId: this.ConvertStringToNumber(route.paramMap.get('classId')),
        name: 'init',
        minPriceString: '100',
      },
      payment: {
        paymentMethods: [
          { type: route.paramMap.get('paymentType')!, name: '', bankCards: [] },
        ],
        token: '',
      },
      addressFrom: {
        title: route.paramMap.get('addressFrom'),
        street: { id: 1, name: '' },
        house: '',
      },
      addressTo: {
        title: route.paramMap.get('addressTo'),
        street: { id: 1, name: '' },
        house: '',
      },
    };
    return this.appStateService.getState();
  }
}
