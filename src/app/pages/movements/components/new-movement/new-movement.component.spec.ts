import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovementComponent } from './new-movement.component';

describe('NewMovementComponent', () => {
  let component: NewMovementComponent;
  let fixture: ComponentFixture<NewMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
