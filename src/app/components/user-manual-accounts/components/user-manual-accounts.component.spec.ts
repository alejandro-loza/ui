import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManualAccountsComponent } from './user-manual-accounts.component';

describe('UserManualAccountsComponent', () => {
  let component: UserManualAccountsComponent;
  let fixture: ComponentFixture<UserManualAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManualAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManualAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
