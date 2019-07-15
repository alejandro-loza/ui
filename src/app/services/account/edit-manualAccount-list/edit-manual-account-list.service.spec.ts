import { TestBed } from '@angular/core/testing';

import { EditManualAccountListService } from './edit-manual-account-list.service';

describe('EditManualAccountListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditManualAccountListService = TestBed.get(EditManualAccountListService);
    expect(service).toBeTruthy();
  });
});
