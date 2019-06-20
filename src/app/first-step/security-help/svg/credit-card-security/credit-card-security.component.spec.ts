import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSecurityComponent } from './credit-card-security.component';

describe('CreditCardSecurityComponent', () => {
  let component: CreditCardSecurityComponent;
  let fixture: ComponentFixture<CreditCardSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
