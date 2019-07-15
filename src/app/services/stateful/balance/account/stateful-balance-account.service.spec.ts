import { TestBed } from '@angular/core/testing';

import { StatefulBalanceAccountService } from './stateful-balance-account.service';

describe('StatefulBalanceAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulBalanceAccountService = TestBed.get(StatefulBalanceAccountService);
    expect(service).toBeTruthy();
  });
});
