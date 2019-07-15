import { TestBed } from '@angular/core/testing';

import { StatefulInstitutionsService } from './stateful-institutions.service';

describe('StatefulInstitutionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulInstitutionsService = TestBed.get(StatefulInstitutionsService);
    expect(service).toBeTruthy();
  });
});
