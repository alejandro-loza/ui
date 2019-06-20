import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSecurityHelpComponent } from './title-security-help.component';

describe('TitleSecurityHelpComponent', () => {
  let component: TitleSecurityHelpComponent;
  let fixture: ComponentFixture<TitleSecurityHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleSecurityHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSecurityHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
