import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMovementComponent } from './delete-movement.component';

describe('DeleteMovementComponent', () => {
  let component: DeleteMovementComponent;
  let fixture: ComponentFixture<DeleteMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
