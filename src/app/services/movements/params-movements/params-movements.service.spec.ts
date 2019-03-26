import { TestBed } from '@angular/core/testing';

import { ParamsMovementsService } from './params-movements.service';

describe('ParamsMovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamsMovementsService = TestBed.get(ParamsMovementsService);
    expect(service).toBeTruthy();
  });
});
