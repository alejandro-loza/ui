import { TestBed } from '@angular/core/testing';

import { StatefulFirebaseService } from './stateful-firebase.service';

describe('StatefulFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatefulFirebaseService = TestBed.get(StatefulFirebaseService);
    expect(service).toBeTruthy();
  });
});
