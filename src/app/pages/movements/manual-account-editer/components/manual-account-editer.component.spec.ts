import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAccountEditerComponent } from './manual-account-editer.component';

describe('ManualAccountEditerComponent', () => {
  let component: ManualAccountEditerComponent;
  let fixture: ComponentFixture<ManualAccountEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualAccountEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAccountEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
