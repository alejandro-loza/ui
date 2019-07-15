import { TestBed } from '@angular/core/testing';

import { StatefulInstitutionService } from './stateful-institution.service';

describe('StatefulInstitutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulInstitutionService = TestBed.get(StatefulInstitutionService);
    expect(service).toBeTruthy();
  });
});
