import { TestBed } from '@angular/core/testing';

import { EmptyStateService } from './empty-state.service';

describe('EmptyStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmptyStateService = TestBed.get(EmptyStateService);
    expect(service).toBeTruthy();
  });
});
