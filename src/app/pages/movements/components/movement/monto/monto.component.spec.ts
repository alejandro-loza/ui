import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoComponent } from './monto.component';

describe('MontoComponent', () => {
  let component: MontoComponent;
  let fixture: ComponentFixture<MontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
