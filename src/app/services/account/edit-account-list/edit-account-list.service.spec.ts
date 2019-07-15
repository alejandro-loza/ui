import { TestBed } from '@angular/core/testing';

import { EditAccountListService } from './edit-account-list.service';

describe('EditAccountListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditAccountListService = TestBed.get(EditAccountListService);
    expect(service).toBeTruthy();
  });
});
