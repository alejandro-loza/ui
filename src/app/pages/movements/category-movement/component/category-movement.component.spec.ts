import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMovementComponent } from './category-movement.component';

describe('CategoryMovementComponent', () => {
  let component: CategoryMovementComponent;
  let fixture: ComponentFixture<CategoryMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
