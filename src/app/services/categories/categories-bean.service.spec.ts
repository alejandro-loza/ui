import { TestBed } from '@angular/core/testing';

import { CategoriesBeanService } from './categories-bean.service';

describe('CategoriesBeanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesBeanService = TestBed.get(CategoriesBeanService);
    expect(service).toBeTruthy();
  });
});
