import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivideMovementComponent } from './divide-movement.component';

describe('DivideMovementComponent', () => {
  let component: DivideMovementComponent;
  let fixture: ComponentFixture<DivideMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivideMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivideMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
