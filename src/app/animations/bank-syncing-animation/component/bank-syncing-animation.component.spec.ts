import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSyncingAnimationComponent } from './bank-syncing-animation.component';

describe('BankSyncingAnimationComponent', () => {
  let component: BankSyncingAnimationComponent;
  let fixture: ComponentFixture<BankSyncingAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankSyncingAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSyncingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
