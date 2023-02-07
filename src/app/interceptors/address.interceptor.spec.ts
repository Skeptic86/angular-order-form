import { TestBed } from '@angular/core/testing';

import { AddressInterceptor } from './address.interceptor';

describe('AddressInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddressInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddressInterceptor = TestBed.inject(AddressInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
