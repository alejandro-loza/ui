import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSyncingComponent } from './account-syncing.component';

describe('AccountSyncingComponent', () => {
  let component: AccountSyncingComponent;
  let fixture: ComponentFixture<AccountSyncingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSyncingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSyncingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
