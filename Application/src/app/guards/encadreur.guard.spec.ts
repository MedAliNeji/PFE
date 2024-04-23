import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { encadreurGuard } from './encadreur.guard';

describe('encadreurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => encadreurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
