import { async, ComponentFixture, TestBed } from   '@angular/core/testing';
import { RouterTestingModule } from                '@angular/router/testing';
import { HttpClientTestingModule } from            '@angular/common/http/testing';
import { FormsModule } from                        '@angular/forms';

import { MaterializeModule } from                  'ngx-materialize';

import { AuthService, FinerioService } from        '@services/services.index';

import { LoginComponent } from                     './login.component';
import { SocialMediaComponent } from               '@components/social-media-button/social-media.component';
import { RegisterLoginComponent } from             '@app/components/register-login-button/register-login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let socialMediaComp: SocialMediaComponent;
  let registerLoginComp: RegisterLoginComponent;

  let fixture: ComponentFixture<LoginComponent>;
  let socialMediaFix: ComponentFixture<SocialMediaComponent>;
  let registerLoginFix: ComponentFixture<RegisterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        SocialMediaComponent,
        RegisterLoginComponent
       ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterializeModule.forRoot(),
        FormsModule
      ],
      providers: [
        AuthService,
        FinerioService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    socialMediaFix = TestBed.createComponent(SocialMediaComponent);
    registerLoginFix = TestBed.createComponent(RegisterLoginComponent);

    component = fixture.componentInstance;
    socialMediaComp = socialMediaFix.componentInstance;
    registerLoginComp = registerLoginFix.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create SocialMediaComponent', () => {
    expect(socialMediaComp).toBeTruthy();
  });

  it('should create RegisterLoginComponent', () => {
    expect(registerLoginComp).toBeTruthy();
  });
});
