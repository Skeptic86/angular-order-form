import { TestBed } from '@angular/core/testing';

import { AppstateResolver } from './appstate.resolver';

describe('AppstateResolver', () => {
  let resolver: AppstateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AppstateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
