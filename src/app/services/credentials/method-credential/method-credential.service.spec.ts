import { TestBed } from '@angular/core/testing';

import { MethodCredentialService } from './method-credential.service';

describe('MethodCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MethodCredentialService = TestBed.get(MethodCredentialService);
    expect(service).toBeTruthy();
  });
});
