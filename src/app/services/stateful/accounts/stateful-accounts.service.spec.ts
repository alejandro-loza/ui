import { TestBed } from '@angular/core/testing';

import { StatefulAccountsService } from './stateful-accounts.service';

describe('StatefulAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulAccountsService = TestBed.get(StatefulAccountsService);
    expect(service).toBeTruthy();
  });
});
