import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMovementComponent } from './cancel-movement.component';

describe('CancelMovementComponent', () => {
  let component: CancelMovementComponent;
  let fixture: ComponentFixture<CancelMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
