import { TestBed } from '@angular/core/testing';

import { CredentialOauth.RequestService } from './credential-oauth.request.service';

describe('CredentialOauth.RequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialOauth.RequestService = TestBed.get(CredentialOauth.RequestService);
    expect(service).toBeTruthy();
  });
});
