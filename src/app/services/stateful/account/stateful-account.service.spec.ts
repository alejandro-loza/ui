import { TestBed } from '@angular/core/testing';

import { StatefulAccountService } from './stateful-account.service';

describe('StatefulAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulAccountService = TestBed.get(StatefulAccountService);
    expect(service).toBeTruthy();
  });
});
