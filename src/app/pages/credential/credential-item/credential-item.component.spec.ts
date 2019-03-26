import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialItemComponent } from './credential-item.component';

describe('CredentialItemComponent', () => {
  let component: CredentialItemComponent;
  let fixture: ComponentFixture<CredentialItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
