import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '@services/toast/toast.service';
import { SignupService } from '@services/signup/signup.service';
import { LoginService } from '@services/login/login.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { FacebookService } from '@services/facebook/facebook.service';
import { User } from '@app/interfaces/user.interface';
import { GTMService } from '@services/google-tag-manager/gtm.service';
import { isNullOrUndefined } from 'util';
declare var window: any;
declare var FB: any;

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
		private gtmService: GTMService,
		private zone: NgZone,
		private facebookService: FacebookService
	) {
		this.isButtonAvailable = false;
		this.facebookService.callSDK();

		window.fbAsyncInit = () => {
			FB.init({
				appId: '2029195763988128',
				autoLogAppEvents: true,
				xfbml: true,
				version: 'v3.3'
			});
			FB.AppEvents.logPageView();
			FB.Event.subscribe('auth.statusChange', (response) => {
				if (response.status === 'connected') {
					this.getMeInfo(response.authResponse.accessToken);
				}
			});
		};
	}

	ngOnInit() {
		if (window.FB) {
			window.FB.XFBML.parse();
		}
	}

	getMeInfo(token: String) {
		FB.api('/me', { fields: 'email' }, (response) => {
			this.loginService.facebookLogin(response.email, token).subscribe(
				(res) => {
					this.signupService.setFacebookSignup = res.sign_up;
					this.signupService.setFacebookLogin = !res.sign_up;
					this.mixpanelService.setFacebookSuccess = true;
				},
				(error) => {
					console.log(error);
				},
				() => {
					return this.zone.run(() => {
						this.router.navigate([ '/access/welcome' ]);
					});
				}
			);
		});
	}

	signup() {
		this.passwordMatch();
		if (this.passwordValidate && this.termsAccepted) {
			this.isButtonAvailable = true;
			this.showSpinner = true;
			this.signupService.signup(this.signupData.value).subscribe(
				(res) => {
					this.mixpanelEvent(res.body.id);
					this.gtmEvent(res.body.id);
					this.toastService.setCode = res.status;
				},
				(error) => {
					this.isButtonAvailable = false;
					this.toastService.setCode = error.status;
					if (isNullOrUndefined(error.error.message)) {
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
		this.mixpanelService.setSignupPeopleProperties(this.signupData.value.email, new Date());
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
