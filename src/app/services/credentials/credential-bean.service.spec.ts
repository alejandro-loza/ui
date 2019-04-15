import { TestBed } from '@angular/core/testing';

import { CredentialBeanService } from './credential-bean.service';

describe('CredentialBeanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CredentialBeanService = TestBed.get(CredentialBeanService);
    expect(service).toBeTruthy();
  });
});
