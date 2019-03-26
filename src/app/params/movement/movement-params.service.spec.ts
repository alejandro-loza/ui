import { TestBed } from '@angular/core/testing';

import { MovementParamsService } from './movement-params.service';

describe('MovementParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovementParamsService = TestBed.get(MovementParamsService);
    expect(service).toBeTruthy();
  });
});
