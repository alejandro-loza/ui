import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBudgetComponentComponent } from './shared-budget-component.component';

describe('SharedBudgetComponentComponent', () => {
  let component: SharedBudgetComponentComponent;
  let fixture: ComponentFixture<SharedBudgetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedBudgetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedBudgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
