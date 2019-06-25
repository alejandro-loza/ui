import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { SignupService } from '@services/signup/signup.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { User } from '@interfaces/user.interface';
declare const FB: any;

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
		private mixpanelService: MixpanelService
	) {
		this.user = {};
	}

	ngOnInit() {
		console.log('OnInitLogin con Subscripcion al evento');
		FB.Event.subscribe('auth.login', (response) => {
			console.log('Dentro de la respuesta en la subscripcion del login');
			this.getMeInfo(response.authResponse.accessToken);
		});
	}

	getMeInfo(token: String) {
		console.log('GET ME INFO FACEBOOK');
		FB.api('/me', { fields: 'email' }, (response) => {
			this.loginService.facebookLogin(response.email, token).subscribe(
				(res) => {
					console.log('dentro de respuesta de ME de Facebook');
					this.signupService.setFacebookSignup = res.signup;
					this.signupService.setFacebookLogin = !res.signup;
					this.mixpanelService.setFacebookSuccess = true;

					return this.router.navigate([ '/access/welcome' ]);
				},
				(error) => {
					console.log(error);
				}
			);
		});
	}

	onFacebookLogin(event: boolean) {
		console.log('event', event);
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
