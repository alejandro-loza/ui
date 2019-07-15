import { TestBed } from '@angular/core/testing';

import { EditCredentialListService } from './edit-credential-list.service';

describe('EditCredentialListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditCredentialListService = TestBed.get(EditCredentialListService);
    expect(service).toBeTruthy();
  });
});
