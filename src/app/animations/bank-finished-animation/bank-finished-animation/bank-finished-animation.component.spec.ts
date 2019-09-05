import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFinishedAnimationComponent } from './bank-finished-animation.component';

describe('BankFinishedAnimationComponent', () => {
  let component: BankFinishedAnimationComponent;
  let fixture: ComponentFixture<BankFinishedAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankFinishedAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFinishedAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
