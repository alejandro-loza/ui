import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAccountMovementComponent } from './manual-account-movement.component';

describe('ManualAccountMovementComponent', () => {
  let component: ManualAccountMovementComponent;
  let fixture: ComponentFixture<ManualAccountMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAccountMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAccountMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
