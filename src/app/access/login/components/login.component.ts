import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { User } from '@interfaces/user.interface';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	private user: User;
	constructor(private router: Router, private renderer: Renderer2, private loginService: LoginService) {
		this.user = {};
	}

	ngOnInit() {}

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
