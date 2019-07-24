import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleBadgeComponent } from './apple-badge.component';

describe('AppleBadgeComponent', () => {
  let component: AppleBadgeComponent;
  let fixture: ComponentFixture<AppleBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppleBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
