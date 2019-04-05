import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWorkshopComponent } from './category-workshop.component';

describe('CategoryWorkshopComponent', () => {
  let component: CategoryWorkshopComponent;
  let fixture: ComponentFixture<CategoryWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
