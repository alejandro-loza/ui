import { TestBed } from '@angular/core/testing';

import { TrackingCredentialService } from './tracking-credential.service';

describe('TrackingCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackingCredentialService = TestBed.get(TrackingCredentialService);
    expect(service).toBeTruthy();
  });
});
