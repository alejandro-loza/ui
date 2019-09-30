import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBankFinishedAnimationComponent } from './spinner-bank-finished-animation.component';

describe('SpinnerBankFinishedAnimationComponent', () => {
  let component: SpinnerBankFinishedAnimationComponent;
  let fixture: ComponentFixture<SpinnerBankFinishedAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerBankFinishedAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerBankFinishedAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
