import { TestBed } from '@angular/core/testing';

import { ProcessingCredentialsService } from './processing-credentials.service';

describe('ProcessingCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessingCredentialsService = TestBed.get(ProcessingCredentialsService);
    expect(service).toBeTruthy();
  });
});
