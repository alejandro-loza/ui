import { async, ComponentFixture, TestBed } from   '@angular/core/testing';
import { HttpClientTestingModule } from            '@angular/common/http/testing';
import { SocialMediaComponent } from               '@components/social-media-button/social-media.component';
import { MaterializeModule } from                  'ngx-materialize';
import { RouterTestingModule } from                '@angular/router/testing';


import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let socialMediaFix: ComponentFixture<SocialMediaComponent>;

  let socialMediaComp: SocialMediaComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, SocialMediaComponent ],
      imports : [
        HttpClientTestingModule,
        MaterializeModule.forRoot(),
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    socialMediaFix = TestBed.createComponent(SocialMediaComponent);

    component = fixture.componentInstance;
    socialMediaComp = socialMediaFix.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create SocialMediaComponent', () => {
    expect(socialMediaComp).toBeTruthy();
  });

});
