import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';
import { LoginService } from '@services/login/login.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { FirebaseAnalyticsService } from '@services/firebase/firebase-analytics/firebase-analytics.service';
import { User } from '@app/interfaces/user.interface';
import { GTMService } from '@services/google-tag-manager/gtm.service';
import { isNullOrUndefined } from 'util';
import { MobileService } from '@services/mobile/mobile.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: [ './signup.component.css' ]
})
export class SignupComponent implements OnInit {
	passwordValidate: boolean = true;
	termsAccepted: boolean = true;
	isButtonAvailable: boolean;
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
		private mixpanelService: MixpanelService,
		private firebaseAnalyticsService: FirebaseAnalyticsService,
		private gtmService: GTMService,
		private mobileService: MobileService
	) {
		this.isButtonAvailable = false;
		if (this.mobileService.mobilecheck()) {
			this.router.navigate([ 'mobile' ]);
		}
	}

	ngOnInit() {}

	signup() {
		this.passwordMatch();
		if (this.passwordValidate && this.termsAccepted) {
			this.isButtonAvailable = true;
			this.showSpinner = true;
			this.signupService.signup(this.signupData.value).subscribe(
				(res) => {
					this.mixpanelEvent(res.body.id);
					this.firebaseAnalyticsService.trackEvent('sign_up');
					this.gtmEvent(res.body.id);
					this.toastService.setCode = res.status;
				},
				(error) => {
					this.isButtonAvailable = false;
					this.toastService.setCode = error.status;
					if (isNullOrUndefined(error.error)) {
						this.toastService.setMessage = 'Ocurrió un error al crear tu cuenta';
					} else {
						this.toastService.setMessage = error.error.message;
					}
					this.toastService.toastGeneral();
					return this.router.navigate([ '/access', 'signup' ]);
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
		this.mixpanelService.setSignupPeopleProperties(this.signupData.value.email, new Date(), id);
		this.mixpanelService.setTrackEvent('Sign up', { from: 'Email', referred: false });
	}

	gtmEvent(id: string) {
		this.gtmService.gtmData = {
			event: 'Sign Up',
			id: id.toString(),
			order: this.gtmService.create_UUID()
		};
		this.gtmService.trigger();
	}

	passwordMatch() {
		this.signupData.value.password === this.signupData.value.passwordConfirm
			? (this.passwordValidate = true)
			: (this.passwordValidate = false);
	}
}
