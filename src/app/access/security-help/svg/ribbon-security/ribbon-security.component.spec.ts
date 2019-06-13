import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonSecurityComponent } from './ribbon-security.component';

describe('RibbonSecurityComponent', () => {
  let component: RibbonSecurityComponent;
  let fixture: ComponentFixture<RibbonSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RibbonSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
