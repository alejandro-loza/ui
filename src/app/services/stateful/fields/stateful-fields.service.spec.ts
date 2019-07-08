import { TestBed } from '@angular/core/testing';

import { StatefulFieldsService } from './stateful-fields.service';

describe('StatefulFieldsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulFieldsService = TestBed.get(StatefulFieldsService);
    expect(service).toBeTruthy();
  });
});
