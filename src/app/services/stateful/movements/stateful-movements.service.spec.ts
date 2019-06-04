import { TestBed } from '@angular/core/testing';

import { StatefulMovementsService } from './stateful-movements.service';

describe('StatefulMovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulMovementsService = TestBed.get(StatefulMovementsService);
    expect(service).toBeTruthy();
  });
});
