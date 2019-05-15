import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinerioLogoComponent } from './finerio-logo.component';

describe('FinerioLogoComponent', () => {
  let component: FinerioLogoComponent;
  let fixture: ComponentFixture<FinerioLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinerioLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinerioLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
