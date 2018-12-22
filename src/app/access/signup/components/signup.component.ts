import { Component } from '@angular/core';
import { SignupService } from '../../../services/signup/signup.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@services/toast/toast.service';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent {
  passwordValidate: boolean = true;
  termsAccepted: boolean = true;
  signupData = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    passwordConfirm: new FormControl(),
    blog: new FormControl(true),
    terms: new FormControl({ value: true }, Validators.required)
  });

  constructor(
    private _signupService: SignupService,
    private router: Router,
    private toastService: ToastService
  ) {}

  signup() {
    this.passwordMatch();
    this.termsValidate();
    if (this.passwordValidate && this.termsAccepted) {
      this._signupService.signup(this.signupData.value).subscribe(
        res => {
          this.router.navigate(['/access/login']);
        },
        error => {
          this.toastService.setMessage = error.error.message;
          this.toastService.toastCode400();
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
    this.signupData.value.terms
      ? (this.termsAccepted = true)
      : (this.termsAccepted = false);
  }
}
