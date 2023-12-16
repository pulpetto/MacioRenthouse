import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasMinimumOffersGuard } from './has-minimum-offers.guard';

describe('hasMinimumOffersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasMinimumOffersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
