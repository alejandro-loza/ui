import { TestBed } from '@angular/core/testing';

import { FirebaseAnalyticsService } from './firebase-analytics.service';

describe('FirebaseAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAnalyticsService = TestBed.get(FirebaseAnalyticsService);
    expect(service).toBeTruthy();
  });
});
