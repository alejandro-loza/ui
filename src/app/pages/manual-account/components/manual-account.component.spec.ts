import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAccountComponent } from './manual-account.component';

describe('ManualAccountComponent', () => {
  let component: ManualAccountComponent;
  let fixture: ComponentFixture<ManualAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
