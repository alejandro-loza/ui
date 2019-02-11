import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptTypeMovementComponent } from './concept-type-movement.component';

describe('ConceptTypeMovementComponent', () => {
  let component: ConceptTypeMovementComponent;
  let fixture: ComponentFixture<ConceptTypeMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptTypeMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptTypeMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
