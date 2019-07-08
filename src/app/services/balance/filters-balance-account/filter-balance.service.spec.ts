import { TestBed } from '@angular/core/testing';

import { FilterBalanceService } from './filter-balance.service';

describe('FilterBalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterBalanceService = TestBed.get(FilterBalanceService);
    expect(service).toBeTruthy();
  });
});
