import { TestBed } from '@angular/core/testing';

import { FirebaseRequestService } from './firebase-request.service';

describe('FirebaseRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseRequestService = TestBed.get(FirebaseRequestService);
    expect(service).toBeTruthy();
  });
});
