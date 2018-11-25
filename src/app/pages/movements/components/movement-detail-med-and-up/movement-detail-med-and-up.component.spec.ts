import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailMedAndUpComponent } from './movement-detail-med-and-up.component';

describe('MovementDetailMedAndUpComponent', () => {
  let component: MovementDetailMedAndUpComponent;
  let fixture: ComponentFixture<MovementDetailMedAndUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementDetailMedAndUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDetailMedAndUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
