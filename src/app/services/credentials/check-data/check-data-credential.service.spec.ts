import { TestBed } from '@angular/core/testing';

import { CheckDataCredentialService } from './check-data-credential.service';

describe('CheckDataCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckDataCredentialService = TestBed.get(CheckDataCredentialService);
    expect(service).toBeTruthy();
  });
});
