import { TestBed } from '@angular/core/testing';

import { PollingCredentialService } from './polling-credential.service';

describe('PollingCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollingCredentialService = TestBed.get(PollingCredentialService);
    expect(service).toBeTruthy();
  });
});
