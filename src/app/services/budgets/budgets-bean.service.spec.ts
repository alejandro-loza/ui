import { TestBed } from '@angular/core/testing';

import { BudgetsBeanService } from './budgets-bean.service';

describe('BudgetsBeanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetsBeanService = TestBed.get(BudgetsBeanService);
    expect(service).toBeTruthy();
  });
});
