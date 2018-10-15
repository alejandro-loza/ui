import { DebugElement } from                     '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaComponent } from             './social-media.component';
import { MaterializeModule } from                'ngx-materialize';
import { By } from '@angular/platform-browser';

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent,
      fixture: ComponentFixture<SocialMediaComponent>,
      FbDe:     DebugElement,
      GglDe:     DebugElement,
      FbEl:     DebugElement,
      GglEl:     DebugElement,
      expectFb,
      expectGgl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterializeModule.forRoot()
      ],
      declarations: [
        SocialMediaComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create @input Facebook', () => {
    FbDe = fixture.debugElement.query(By.css('.facebook-color'));
    FbEl = FbDe.nativeElement;
    expectFb = { text: 'Dummy Fb text' };
    component.facebookText = expectFb.text;
  });

  it('should create @input Google', () => {
    GglDe = fixture.debugElement.query(By.css('.google-color'));
    GglEl = FbDe.nativeElement;
    expectGgl = { text: 'Dummy Google text' };
    component.googleText = expectGgl.text;
  });
});
