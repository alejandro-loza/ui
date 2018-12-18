import { TestBed } from '@angular/core/testing';

import { DateApiService } from './date-api.service';

describe('DateApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateApiService = TestBed.get(DateApiService);
    expect(service).toBeTruthy();
  });
});
