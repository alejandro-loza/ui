import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { FacebookService } from '@services/facebook/facebook.service';
import { SignupService } from '@services/signup/signup.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { ToastService } from '@services/toast/toast.service';
import { LoginService } from '@services/login/login.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { isNullOrUndefined } from 'util';
//imports above
declare var window: any;
declare var FB: any;

@Component({
	selector: 'app-social-media',
	templateUrl: './social-media.component.html',
	styleUrls: [ './social-media.component.css' ]
})
export class SocialMediaComponent implements OnInit {
	@Input() facebookText: string;
	@Input() googleText: string;
	url: string;

	constructor(
		private facebookService: FacebookService,
		private signupService: SignupService,
		private mixpanelService: MixpanelService,
		private zone: NgZone,
		private loginService: LoginService,
		private router: Router,
		private toast: ToastService
	) {
		// This function initializes the FB variable
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
		if (isDevMode() === true) {
			this.url = 'http://localhost:4200';
		} else {
			this.url = 'https://app.finerio.mx';
		}
		if (window.FB) {
			window.FB.XFBML.parse();
		}
	}

	getMeInfo(token: String) {
		FB.api('/me', { fields: 'email' }, (response) => {
			console.log(response);
			if (!isNullOrUndefined(response.email)) {
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
			} else {
				this.toast.setCode = 500;
				this.toast.setMessage = 'Necesitamos tu email de Facebook para continuar.';
				this.toast.toastGeneral();
			}
		});
	}
}
