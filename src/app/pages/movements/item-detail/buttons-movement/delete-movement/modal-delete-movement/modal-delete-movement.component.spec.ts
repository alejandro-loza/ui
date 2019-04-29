import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteMovementComponent } from './modal-delete-movement.component';

describe('ModalDeleteMovementComponent', () => {
  let component: ModalDeleteMovementComponent;
  let fixture: ComponentFixture<ModalDeleteMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
