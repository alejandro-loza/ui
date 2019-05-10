import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaccountsComponent } from './modal-maccounts.component';

describe('ModalMaccountsComponent', () => {
  let component: ModalMaccountsComponent;
  let fixture: ComponentFixture<ModalMaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
