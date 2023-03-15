import { Observable, of } from 'rxjs';
import { IAppState } from './../interfaces/app-state.interface';
import { AppStateService } from './../services/app-state/app-state.service';
import { TestBed } from '@angular/core/testing';

import { AddressInterceptor } from './address.interceptor';
import {
  HttpEventType,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams,
} from '@angular/common/http';
class MockAppStateService {
  getStateValue(): IAppState {
    return { baseId: 1 };
  }
}

class MockHttpHandler extends HttpHandler {
  handle(req: HttpRequest<any>): Observable<any> {
    return of(1);
  }
}

describe('AddressInterceptor', () => {
  let appState: AppStateService;
  let interceptor: AddressInterceptor;
  let handler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddressInterceptor,
        { provide: AppStateService, useClass: MockAppStateService },
      ],
    });

    appState = TestBed.inject(AppStateService);
    interceptor = TestBed.inject(AddressInterceptor);
    // handler = TestBed.inject(HttpHandler);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('handler shoud be called', () => {
    // Arrange
    const req = new HttpRequest('GET', 'https://google.com');
    const expectedReq = req.clone({
      params: new HttpParams()
        .set('udid', '275932435422a972367c8827a28137ac')
        .set('base', 1)
        .set('type', 0),
    });
    const handler: HttpHandler = new MockHttpHandler();
    const handlerSpy = spyOn(handler, 'handle').and.returnValue(
      of(new HttpResponse<any>())
    );
    // Act
    interceptor.intercept(req, handler).subscribe((res) => {
      // Assert
      expect(handlerSpy).toHaveBeenCalledWith(expectedReq);
    });
  });
});
