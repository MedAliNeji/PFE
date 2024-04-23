import { TestBed } from '@angular/core/testing';

import { DepotStageService } from './depot-stage.service';

describe('DepotStageService', () => {
  let service: DepotStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
