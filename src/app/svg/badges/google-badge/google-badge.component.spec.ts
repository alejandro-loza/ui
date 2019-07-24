import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleBadgeComponent } from './google-badge.component';

describe('GoogleBadgeComponent', () => {
  let component: GoogleBadgeComponent;
  let fixture: ComponentFixture<GoogleBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
