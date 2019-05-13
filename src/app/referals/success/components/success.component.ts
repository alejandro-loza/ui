import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ToastService } from '@services/toast/toast.service';
import { ConfigService } from '@services/config/config.service';
import { AuthService } from '@services/auth/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-success',
	templateUrl: './success.component.html',
	styleUrls: [ './success.component.css' ]
})
export class SuccessComponent implements OnInit {
	private token: string;
	private type: string;
	private code: string;

	success: boolean;
	from: string;

	constructor(
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private configService: ConfigService,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.getParamsFromSocialNetwork();
	}

	makeRelateOfUsers() {
		if (!isNullOrUndefined(this.code)) {
			let body = { referralCode: this.code };
			this.authService.relateInviter(body).subscribe((res) => {
				this.success = res.status == 200 ? true : false;
			});
		}
	}

	getParamsFromSocialNetwork() {
		this.activatedRoute.queryParams.subscribe(
			(res: Params) => {
				this.type = res.type;
				this.from = res.from;
				this.token = res.accessToken;
				this.code = res.finerioCode;
				this.configService.setAccessToken = this.token;
				this.makeRelateOfUsers();
			},
			(err) => {
				this.toastService.setCode = 500;
				this.toastService.setMessage = 'Hubo un error al obtener tus datos';
				this.toastService.toastGeneral();
				this.router.navigate([ '/access/login' ]);
			}
		);
	}
}
