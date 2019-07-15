import { TestBed } from '@angular/core/testing';

import { ToastCredentialService } from './toast-credential.service';

describe('ToastCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastCredentialService = TestBed.get(ToastCredentialService);
    expect(service).toBeTruthy();
  });
});
