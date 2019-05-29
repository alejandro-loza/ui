import { TestBed } from '@angular/core/testing';

import { EditMovementListService } from './edit-movement-list.service';

describe('EditMovementListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditMovementListService = TestBed.get(EditMovementListService);
    expect(service).toBeTruthy();
  });
});
