import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAccountItemComponent } from './manual-account-item.component';

describe('ManualAccountItemComponent', () => {
  let component: ManualAccountItemComponent;
  let fixture: ComponentFixture<ManualAccountItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAccountItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAccountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
