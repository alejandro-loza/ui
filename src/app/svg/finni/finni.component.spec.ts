import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinniComponent } from './finni.component';

describe('FinniComponent', () => {
  let component: FinniComponent;
  let fixture: ComponentFixture<FinniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
