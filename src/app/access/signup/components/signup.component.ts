import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';
import { LoginService } from '@services/login/login.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { User } from '@app/interfaces/user.interface';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ]
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
	showSpinner: boolean = false;
	private user: User = {};

	constructor(
		private signupService: SignupService,
		private router: Router,
		private toastService: ToastService,
		private loginService: LoginService,
		private mixpanelService: MixpanelService
	) {}

	signup() {
		this.passwordMatch();
		if (this.passwordValidate && this.termsAccepted) {
			this.showSpinner = true;
			this.signupService.signup(this.signupData.value).subscribe(
				(res) => {
					this.mixpanelEvent(res.body.id);
					this.toastService.setCode = res.status;
				},
				(error) => {
					this.toastService.setCode = error.status;
					this.toastService.setMessage = error.error.message;
					this.toastService.toastGeneral();
				},
				() => {
					this.toastService.setMessage = '¡Se creó tu cuenta!';
					this.toastService.toastGeneral();
					this.login();
				}
			);
		}
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
				return this.router.navigate([ '/access/welcome' ]);
			}
		);
	}

	mixpanelEvent(id: string) {
		this.signupService.setComesFromSignup = true;
		this.mixpanelService.setIdentify(id);
		this.mixpanelService.setSignupPeopleProperties(this.signupData.value.email, new Date());
		this.mixpanelService.setTrackEvent('Sign up', { from: 'Email', referred: false });
	}

	passwordMatch() {
		this.signupData.value.password === this.signupData.value.passwordConfirm
			? (this.passwordValidate = true)
			: (this.passwordValidate = false);
	}
}
