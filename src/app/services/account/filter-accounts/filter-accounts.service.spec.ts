import { TestBed } from '@angular/core/testing';

import { FilterAccountsService } from './filter-accounts.service';

describe('FilterAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterAccountsService = TestBed.get(FilterAccountsService);
    expect(service).toBeTruthy();
  });
});
