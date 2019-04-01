import { TestBed } from '@angular/core/testing';

import { DashboardStatesService } from './dashboard-states.service';

describe('DashboardStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardStatesService = TestBed.get(DashboardStatesService);
    expect(service).toBeTruthy();
  });
});
