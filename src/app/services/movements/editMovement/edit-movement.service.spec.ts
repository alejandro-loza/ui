import { TestBed } from '@angular/core/testing';

import { EditMovementService } from './edit-movement.service';

describe('EditMovementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditMovementService = TestBed.get(EditMovementService);
    expect(service).toBeTruthy();
  });
});
