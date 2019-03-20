import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  passwordValidate: boolean = true;
  termsAccepted: boolean = true;
  signupData: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl(),
    blog: new FormControl(true),
    termsAndConditions: new FormControl({ value: true }, Validators.required)
  });

  constructor(
    private signupService: SignupService,
    private router: Router,
    private toastService: ToastService
  ) { }

  signup() {
    this.passwordMatch();
    this.termsValidate();
    if (this.passwordValidate && this.termsAccepted) {
      this.signupService.signup(this.signupData.value).subscribe(
        res => {
          this.toastService.setCode = res.status;
        },
        error => {
          this.toastService.setCode = error.status;
          this.toastService.setMessage = error.error.message;
          this.toastService.toastGeneral();
        },
        () => {
          this.toastService.setMessage = '¡Se creó tu cuenta!';
          this.toastService.toastGeneral();
          return this.router.navigate(['/access/login']);
        }
      );
    }
  }

  passwordMatch() {
    this.signupData.value.password === this.signupData.value.passwordConfirm
      ? (this.passwordValidate = true)
      : (this.passwordValidate = false);
  }

  termsValidate() {
    this.signupData.value.termsAndConditions
      ? (this.termsAccepted = true)
      : (this.termsAccepted = false);
  }
}
