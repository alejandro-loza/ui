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
  formTitle: string;
  showSignupForm: boolean;
  sendButtonText: string;
  anotherFormText: string;

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
    this.formTitle = "o Regístrate con tu correo electrónico:"
    this.sendButtonText = "Registrarme";
    this.anotherFormText = '¿Ya tienes cuenta en Finerio? Inicia sesión aquí';
  }

  ngOnInit() {
  }

  anotherFormClicked() {
    this.showSignupForm == false ?
      this.showSignForm() :
      this.showLoginForm()
  }

  showSignForm() {
    document.getElementById('actionForm').classList.remove('topAnimation');
    document.getElementById('actionForm').classList.add('resetAnimation');

    this.showSignupForm = true;
    this.formTitle = "o Regístrate con tu correo electrónico:"
    this.sendButtonText = "Registrarme";
    this.anotherFormText = '¿Ya tienes cuenta en Finerio? Inicia sesión aquí';
  }

  showLoginForm() {
    document.getElementById('actionForm').classList.add('topAnimation');
    document.getElementById('actionForm').classList.remove('resetAnimation');

    this.showSignupForm = false;
    this.formTitle = "o con tu correo electrónico:"
    this.sendButtonText = 'Entrar';
    this.anotherFormText = '¿Aún no tienes cuenta en Finerio? Registrate aquí';
  }

  submitFormAction() {
    this.showSignupForm ? this.signup() : this.login()
  }

  signup() {
    this.passwordMatch();
    if (!this.passwordValidate) { return }
    this.signupButtonClicked = true
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
    this.signupButtonClicked = true
    this.user.email = this.signupData.value.email;
    this.user.password = this.signupData.value.password;
    this.loginService.login(this.user).subscribe(
      (res) => {
      }, (err) => {
        return err;
      },
      () => {
        this.procesHasBegun.emit();
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
