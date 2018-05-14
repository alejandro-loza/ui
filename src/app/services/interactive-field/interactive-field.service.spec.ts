import { TestBed, inject } from '@angular/core/testing';

import { InteractiveFieldService } from './interactive-field.service';

describe('InteractiveFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractiveFieldService]
    });
  });

  it('should be created', inject([InteractiveFieldService], (service: InteractiveFieldService) => {
    expect(service).toBeTruthy();
  }));
});
