import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';

import { ToastInterface } from '@interfaces/toast.interface';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ]
})
export class SignupComponent {
	passwordValidate: boolean = true;
	termsAccepted: boolean = true;
	toastInterface: ToastInterface;
	signupData: FormGroup = new FormGroup({
		email: new FormControl(),
		password: new FormControl(),
		passwordConfirm: new FormControl(),
		blog: new FormControl(true),
		termsAndConditions: new FormControl({ value: true }, Validators.required)
	});
	showSpinner: boolean = false;

	constructor(private signupService: SignupService, private router: Router, private toastService: ToastService) {
		this.toastInterface = { code: null, message: null, classes: null };
	}

	signup() {
		this.showSpinner = true;
		this.passwordMatch();
		this.termsValidate();
		if (this.passwordValidate && this.termsAccepted) {
			this.signupService.signup(this.signupData.value).subscribe(
				(res) => res,
				(error) => {
					this.toastInterface.code = error.status;
					this.toastInterface.message = error.error.message;
					this.toastService.toastGeneral(this.toastInterface);
				},
				() => {
					this.toastInterface = {
						code: 200,
						message: '¡Se creó tu cuenta!'
					};
					this.toastService.toastGeneral(this.toastInterface);
					return this.router.navigate([ '/access/login' ]);
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
		this.signupData.value.termsAndConditions ? (this.termsAccepted = true) : (this.termsAccepted = false);
	}
}
