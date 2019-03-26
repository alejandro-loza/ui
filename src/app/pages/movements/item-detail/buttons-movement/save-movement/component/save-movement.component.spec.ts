import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMovementComponent } from './save-movement.component';

describe('SaveMovementComponent', () => {
  let component: SaveMovementComponent;
  let fixture: ComponentFixture<SaveMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
