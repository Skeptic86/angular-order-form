import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(140);
  }

  getClickEvent():Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
