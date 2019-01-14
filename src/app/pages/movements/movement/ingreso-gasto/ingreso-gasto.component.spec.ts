import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoGastoComponent } from './ingreso-gasto.component';

describe('IngresoGastoComponent', () => {
  let component: IngresoGastoComponent;
  let fixture: ComponentFixture<IngresoGastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoGastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
