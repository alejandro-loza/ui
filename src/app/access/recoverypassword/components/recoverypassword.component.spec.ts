import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverypasswordComponent } from './recoverypassword.component';

describe('RecoverypasswordComponent', () => {
  let component: RecoverypasswordComponent;
  let fixture: ComponentFixture<RecoverypasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverypasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverypasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
