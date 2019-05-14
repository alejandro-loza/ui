import { TestBed } from '@angular/core/testing';

import { StateMovementsService } from './state-movements.service';

describe('StateMovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateMovementsService = TestBed.get(StateMovementsService);
    expect(service).toBeTruthy();
  });
});
