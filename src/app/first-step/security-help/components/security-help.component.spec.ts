import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityHelpComponent } from './security-help.component';

describe('SecurityHelpComponent', () => {
  let component: SecurityHelpComponent;
  let fixture: ComponentFixture<SecurityHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
