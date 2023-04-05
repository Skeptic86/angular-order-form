import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IBase } from 'src/app/interfaces/base.interface';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';

import { BaseService } from './base.service';

fdescribe('BaseService', () => {
  let service: BaseService;
  let httpController: HttpTestingController;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let baseService: BaseService;

  const apiURL = 'https://dev-api.taxsee.com/client/v1/bases';

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BaseService);
    // 1 способ
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    baseService = new BaseService(httpClientSpy);
    // 2 способ
    service = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call #getBasesApi and return Observable<IBase>', () => {
    //Arrange
    const countryCode = 'ru';
    const mockIBase: IBase[] = [
      {
        id: 1,
        latitude: 1,
        longitude: 1,
        name: 'string',
        placeId: 1,
        region: 'string',
        regionId: 1,
      },
    ];
    //Act
    service.getBasesApi(countryCode).subscribe((data) => {
      //Assert
      expect(data).toEqual(mockIBase);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiURL}?country=${countryCode}`,
    });
    req.flush(mockIBase);
  });
});
