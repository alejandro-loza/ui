import { TestBed } from '@angular/core/testing';

import { StatefulCredentialService } from './stateful-credential.service';

describe('StatefulCredentialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulCredentialService = TestBed.get(StatefulCredentialService);
    expect(service).toBeTruthy();
  });
});
