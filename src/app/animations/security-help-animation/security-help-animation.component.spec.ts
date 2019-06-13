import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityHelpAnimationComponent } from './security-help-animation.component';

describe('SecurityHelpAnimationComponent', () => {
  let component: SecurityHelpAnimationComponent;
  let fixture: ComponentFixture<SecurityHelpAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityHelpAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityHelpAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
