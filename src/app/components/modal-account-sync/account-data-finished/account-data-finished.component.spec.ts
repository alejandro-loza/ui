import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDataFinishedComponent } from './account-data-finished.component';

describe('AccountDataFinishedComponent', () => {
  let component: AccountDataFinishedComponent;
  let fixture: ComponentFixture<AccountDataFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDataFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDataFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
