import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccountSyncComponent } from './modal-account-sync.component';

describe('ModalAccountSyncComponent', () => {
  let component: ModalAccountSyncComponent;
  let fixture: ComponentFixture<ModalAccountSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAccountSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccountSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
