import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMovementComponent } from './detail-movement.component';

describe('DetailMovementComponent', () => {
  let component: DetailMovementComponent;
  let fixture: ComponentFixture<DetailMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
