import { ICode } from 'src/app/interfaces/code.interface';
import {
  HttpClient,
  provideHttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthorizationService } from './authorization.service';
import { of, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpController: HttpTestingController;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthorizationService;

  let apiSendCodeURL = 'https://dev-api.taxsee.com/client/v1/auth/send-code';

  let apiConfirmCodeURL =
    'https://dev-api.taxsee.com/client/v1/auth/confirm-code';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    // 1 способ
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthorizationService(httpClientSpy);
    // 2 способ
    service = TestBed.inject(AuthorizationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call #sendCode and return Observable<ICode>', () => {
    //Arrange
    const phone = '89224223454';
    const type = 0;
    const mockICode: ICode = {
      success: 'true',
      message: 'string',
      token: '123',
    };
    //Act
    service.sendCode(phone, type).subscribe((data) => {
      //Assert
      expect(data).toEqual(mockICode);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: apiSendCodeURL,
    });
    req.flush(mockICode);
  });

  it('should call #confirmCode and return Observable<ICode>', () => {
    //Arrange
    const code = '89224223454';
    const token = '0';
    const mockICode: ICode = {
      success: 'true',
      message: 'string',
      token: '123',
    };
    //Act
    service.confirmCode(code, token).subscribe((data) => {
      //Assert
      expect(data).toEqual(mockICode);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiConfirmCodeURL}?access-token=0`,
    });
    req.flush(mockICode);
  });

  it('should return expected code via #confrimCode (HttpClient called once)', (done: DoneFn) => {
    //Arrange
    const expectedCode: ICode = {
      success: 'true',
      message: 'string',
      token: '123',
    };
    const code = '89224223454';
    const token = '0';
    //Act
    httpClientSpy.post.and.returnValue(of(expectedCode));
    authService.confirmCode(code, token).subscribe({
      next: (code) => {
        //Assert
        expect(code).withContext('expected code').toEqual(expectedCode);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should return an error when the server returns a 404', () => {
    //Arrange
    const code = '89224223454';
    const token = '0';
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    //Act
    httpClientSpy.post.and.returnValue(of(errorResponse));
    authService.confirmCode(code, token).subscribe((error) => {
      //Assert
      expect(error.message).toContain('404');
    });
  });
});
