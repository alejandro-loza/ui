import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovementComponent } from './edit-movement.component';

describe('EditMovementComponent', () => {
  let component: EditMovementComponent;
  let fixture: ComponentFixture<EditMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
