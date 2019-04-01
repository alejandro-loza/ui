import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMovementsButtonComponent } from './see-movements-button.component';

describe('SeeMovementsButtonComponent', () => {
  let component: SeeMovementsButtonComponent;
  let fixture: ComponentFixture<SeeMovementsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeMovementsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMovementsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
