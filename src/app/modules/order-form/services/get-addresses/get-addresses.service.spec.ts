import { TestBed } from '@angular/core/testing';

import { GetAddressesService } from './get-addresses.service';

describe('GetAddressesService', () => {
  let service: GetAddressesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAddressesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
