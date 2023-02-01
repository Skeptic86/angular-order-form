import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPriceService {
  subject$ = new Subject<string | number | null>();

  sendClickEvent() {
    this.subject$.next(null);
  }

  getClickEvent(): Observable<any> {
    return this.subject$.asObservable();
  }

  constructor() {}
}
