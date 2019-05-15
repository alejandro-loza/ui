import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinerioIconComponent } from './finerio-icon.component';

describe('FinerioIconComponent', () => {
  let component: FinerioIconComponent;
  let fixture: ComponentFixture<FinerioIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinerioIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinerioIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
