import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBankSyncAnimationComponent } from './spinner-bank-sync-animation.component';

describe('SpinnerBankSyncAnimationComponent', () => {
  let component: SpinnerBankSyncAnimationComponent;
  let fixture: ComponentFixture<SpinnerBankSyncAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerBankSyncAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerBankSyncAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
