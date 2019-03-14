import { TestBed } from '@angular/core/testing';

import { InstitutionParamsService } from './institution-params.service';

describe('InstitutionParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionParamsService = TestBed.get(InstitutionParamsService);
    expect(service).toBeTruthy();
  });
});
