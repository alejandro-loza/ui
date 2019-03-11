import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/toast/toast.service';
import { AccountService } from '@services/account/account.service';

import { ToastInterface } from '@interfaces/toast.interface';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: [ './welcome.component.css' ]
})
export class WelcomeComponent implements OnInit {
	toastInterface: ToastInterface;
	constructor(
		private accountService: AccountService,
		private authService: AuthService,
		private router: Router,
		private renderer: Renderer2,
		private toastService: ToastService
	) {
		this.toastInterface = { code: null, message: null, classes: null };
	}

	ngOnInit() {
		this.renderer.addClass(document.querySelector('img.logo-white'), 'hide');
		this.personalInfoUser();
	}

	personalInfoUser() {
		this.authService.personalInfo().subscribe(
			(res) => {
				if (res.body.accountLocked === true) {
					this.toastInterface = {
						code: 401,
						message: 'Tu cuenta fue bloqueada, por favor <br> ponte en contacto con nosotros'
					};
					this.toastService.toastGeneral(this.toastInterface);
					this.router.navigate([ 'access/login' ]);
				}
			},
			(err) => {
				this.toastInterface = {
					code: err.status,
					message: 'Ocurrió un error al obtener tus datos'
				};
				this.toastService.toastGeneral(this.toastInterface);

				this.renderer.removeClass(document.querySelector('img.logo-white'), 'hide');
				this.router.navigate([ 'access/login' ]);
			},
			() => {
				this.getAccount();
			}
		);
	}

	getAccount() {
		const id = sessionStorage.getItem('id-user');
		this.accountService.getAccounts(id).subscribe((res) => {
			if (res.body.size > 1) {
				this.router.navigate([ '/app/dashboard' ]);
			} else {
				this.router.navigate([ '/app/banks' ]);
			}
		});
	}
}
