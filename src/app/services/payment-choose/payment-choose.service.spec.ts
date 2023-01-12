import { TestBed } from '@angular/core/testing';

import { PaymentChooseService } from './payment-choose.service';

describe('PaymentChooseService', () => {
  let service: PaymentChooseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentChooseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
