import { AppStateService } from './../services/app-state/app-state.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddressInterceptor implements HttpInterceptor {
  constructor(private appStateService: AppStateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      params: (request.params ? request.params : new HttpParams())
        .set('udid', '275932435422a972367c8827a28137ac')
        .set('base', 1)
        .set('type', 0),
    });
    return next.handle(request);
  }
}
