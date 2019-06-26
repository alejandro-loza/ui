import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { SignupService } from '@services/signup/signup.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { User } from '@interfaces/user.interface';
//imports above
declare var window: any;
declare var FB: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	private user: User;
	constructor(
		private router: Router,
		private renderer: Renderer2,
		private loginService: LoginService,
		private signupService: SignupService,
		private mixpanelService: MixpanelService,
		private zone: NgZone
	) {
		this.user = {};
		// This function initializes the FB variable
		(function(d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = '//connect.facebook.net/es_LA/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'script', 'facebook-jssdk');

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

	login(loginForm: NgForm) {
		this.user.email = loginForm.value.email;
		this.user.password = loginForm.value.password;
		this.renderer.addClass(document.getElementById('buttonElement'), 'disabled');
		this.renderer.setAttribute(document.getElementById('buttonElement'), 'disabled', 'disabled');

		this.loginService.login(this.user).subscribe(
			(res) => res,
			(err) => {
				this.renderer.removeClass(document.getElementById('buttonElement'), 'disabled');
				this.renderer.removeAttribute(document.getElementById('buttonElement'), 'disabled');
				return err;
			},
			() => {
				loginForm.reset();
				return this.router.navigate([ '/access/welcome' ]);
			}
		);
		this.renderer.removeClass(document.getElementById('buttonElement'), 'disabled');
		this.renderer.removeAttribute(document.getElementById('buttonElement'), 'disabled');
		this.renderer.removeClass(document.getElementById('Inputemail'), 'valid');
		this.renderer.removeClass(document.getElementById('Inputemail'), 'invalid');
		this.renderer.removeClass(document.getElementById('Inputpassword'), 'invalid');
		this.renderer.removeClass(document.getElementById('Inputpassword'), 'invalid');
	}
}
