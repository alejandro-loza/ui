import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';
import { LoginService } from '@services/login/login.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { FirebaseAnalyticsService } from '@services/firebase/firebase-analytics/firebase-analytics.service';
import { FacebookService } from "@services/facebook/facebook.service";
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  private user: User = {};
  signupData: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl(),
    blog: new FormControl(true),
    promoCode: new FormControl(),
    termsAndConditions: new FormControl({ value: true }, Validators.required)
  });
  passwordValidate: boolean;
  signupButtonClicked: boolean;
  showSignupForm: boolean;

  @Output() procesHasBegun: EventEmitter<boolean>;
  constructor(private signupService: SignupService,
    private toast: ToastService,
    private mixpanel: MixpanelService,
    private firebaseAnalytics: FirebaseAnalyticsService,
    private facebook: FacebookService,
    private loginService: LoginService,
    private router: Router) {
    this.passwordValidate = true
    this.signupButtonClicked = false
    this.procesHasBegun = new EventEmitter();
    this.showSignupForm = true;
  }

  ngOnInit() {
  }

  loginButtonEvent() {
    this.fadeOutSignupForm()
  }

  fadeOutSignupForm() {
    this.showSignupForm = false

  }

  signup() {
    this.passwordMatch();
    this.signupButtonClicked = true
    if (!this.passwordValidate) { return }

    this.signupService.signup(this.signupData.value).subscribe(res => {
      this.analyticsEvents(res);
      this.toast.setCode = res.status

    }, (error) => {

      console.log(error.error)
      this.signupButtonClicked = false
      this.toast.setCode = error.status;
      this.toast.setMessage = 'Ocurrió un error al crear tu cuenta';
      this.toast.toastGeneral();
      return

    }, () => {
      this.procesHasBegun.emit();
      this.toast.setMessage = '¡Se creó tu cuenta!';
      this.toast.toastGeneral();
      this.login();
    })
  }

  login() {
    this.user.email = this.signupData.value.email;
    this.user.password = this.signupData.value.password;
    this.loginService.login(this.user).subscribe(
      (res) => res,
      (err) => {
        return err;
      },
      () => {
        return this.router.navigate(['/access/welcome']);
      }
    );
  }

  analyticsEvents(response: any) {
    this.mixpanelEvent(response.body.id);
    this.firebaseAnalytics.trackEvent('sign_up');
    this.facebook.trackEvent("sign_up");
  }

  mixpanelEvent(id: string) {
    this.signupService.setComesFromSignup = true;
    this.mixpanel.setIdentify(id);
    this.mixpanel.setSignupPeopleProperties(this.signupData.value.email, new Date(), id);
    this.mixpanel.setTrackEvent('Sign up', { from: 'Email', referred: false });
  }

  passwordMatch() {
    this.signupData.value.password === this.signupData.value.passwordConfirm
      ? (this.passwordValidate = true)
      : (this.passwordValidate = false);
  }

}
