import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ConfigService } from '@services/config/config.service';
import { ToastService } from '@services/toast/toast.service';
import { AuthService } from '@services/auth/auth.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

@Component({
	selector: 'app-social-networks',
	templateUrl: './social-networks.component.html',
	styleUrls: [ './social-networks.component.css' ]
})
export class SocialNetworksComponent implements OnInit {
	private token: string;
	private type: string;
	private code: string;

	from: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private configService: ConfigService,
		private authService: AuthService,
		private toastService: ToastService,
		private mixpanelService: MixpanelService
	) {}

	ngOnInit() {
		this.getParamsFromSocialNetwork();
	}

	getParamsFromSocialNetwork() {
		this.activatedRoute.queryParams.subscribe(
			(res: Params) => {
				this.type = res.type;
				this.from = res.from;
				this.token = res.accessToken;
				if (res.finerioCode) {
					this.code = res.finerioCode;
				} else {
					this.loadUser();
				}
				this.mixpanelEvent(res.from, res.type, res.finerioCode);
			},
			(err) => {
				this.toastService.setCode = 500;
				this.toastService.setMessage = 'Hubo un error al obtener tus datos';
				this.toastService.toastGeneral();
				this.router.navigate([ '/access/login' ]);
			}
		);
	}

	mixpanelEvent(from: string, type: string, referralCode: string) {
		this.authService.personalInfo().subscribe((res) => {
			this.mixpanelService.setIdentify(res.body.id);
			type == 'login'
				? this.mixpanelService.setTrackEvent('Log in', { from: from })
				: this.mixpanelService.setTrackEvent('Sign up', { from: from, referred: referralCode ? true : false });
		});
	}

	loadUser() {
		this.configService.setAccessToken = this.token;
		this.router.navigate([ '/access/welcome' ]);
	}
}
