import { TestBed } from '@angular/core/testing';

import { AccountsBeanService } from './accounts-bean.service';

describe('AccountsBeanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsBeanService = TestBed.get(AccountsBeanService);
    expect(service).toBeTruthy();
  });
});
