import { TestBed } from '@angular/core/testing';

import { DashboardBeanService } from './dashboard-bean.service';

describe('DashboardBeanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardBeanService = TestBed.get(DashboardBeanService);
    expect(service).toBeTruthy();
  });
});
