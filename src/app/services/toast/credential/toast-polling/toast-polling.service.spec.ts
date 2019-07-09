import { TestBed } from '@angular/core/testing';

import { ToastPollingService } from './toast-polling.service';

describe('ToastPollingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastPollingService = TestBed.get(ToastPollingService);
    expect(service).toBeTruthy();
  });
});
