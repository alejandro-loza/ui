import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesChartComponent } from './incomes-chart.component';

describe('IncomesChartComponent', () => {
  let component: IncomesChartComponent;
  let fixture: ComponentFixture<IncomesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
