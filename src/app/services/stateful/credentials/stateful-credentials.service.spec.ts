import { TestBed } from '@angular/core/testing';

import { StatefulCredentialsService } from './stateful-credentials.service';

describe('StatefulCredentialsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulCredentialsService = TestBed.get(StatefulCredentialsService);
    expect(service).toBeTruthy();
  });
});
