import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailMobileComponent } from './movement-detail-mobile.component';

describe('MovementDetailMobileComponent', () => {
  let component: MovementDetailMobileComponent;
  let fixture: ComponentFixture<MovementDetailMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementDetailMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDetailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
