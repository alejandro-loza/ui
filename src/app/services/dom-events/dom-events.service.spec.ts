import { TestBed } from '@angular/core/testing';

import { DomEventsService } from './dom-events.service';

describe('DomEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomEventsService = TestBed.get(DomEventsService);
    expect(service).toBeTruthy();
  });
});
