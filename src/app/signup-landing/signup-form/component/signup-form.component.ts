import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { FirebaseAnalyticsService } from '@services/firebase/firebase-analytics/firebase-analytics.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupData: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl(),
    blog: new FormControl(true),
    promoCode: new FormControl(),
    termsAndConditions: new FormControl({ value: true }, Validators.required)
  });
  passwordValidate: Boolean;

  constructor() {
    this.passwordValidate = true
  }

  ngOnInit() {
  }

  signup() {
    this.passwordMatch();

  }

  passwordMatch() {
    this.signupData.value.password === this.signupData.value.passwordConfirm
      ? (this.passwordValidate = true)
      : (this.passwordValidate = false);
  }

}
