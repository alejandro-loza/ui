import { TestBed } from '@angular/core/testing';

import { CategoriesHelperService } from './categories-helper.service';

describe('CategoriesHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesHelperService = TestBed.get(CategoriesHelperService);
    expect(service).toBeTruthy();
  });
});
