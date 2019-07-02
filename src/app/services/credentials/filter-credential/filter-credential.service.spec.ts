import { TestBed } from '@angular/core/testing';

import { FilterCredentialService } from './filter-credential.service';

describe('FilterCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterCredentialService = TestBed.get(FilterCredentialService);
    expect(service).toBeTruthy();
  });
});
