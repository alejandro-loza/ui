import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsiderarComponent } from './considerar.component';

describe('ConsiderarComponent', () => {
  let component: ConsiderarComponent;
  let fixture: ComponentFixture<ConsiderarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsiderarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsiderarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
