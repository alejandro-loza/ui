import { Injectable, isDevMode } from '@angular/core';
import { ConfigService } from '@services/config/config.service';
import { CredentialService } from '@services/credentials/credential.service';
declare var mixpanel: any;

@Injectable({
	providedIn: 'root'
})
export class MixpanelService {
	// super
	hasCredentials: boolean;
	linkedCredentials: number;

	//people
	invalidCredentials: boolean;
	lastLoggedIn: Date;
	validCredentials: boolean;

	facebookSuccess: boolean;
	userId: string;

	mixpanelProdId = 'ff78a68966249a8ff13e588119ab7df0';
	mixpanelDevMode = 'b8a3d1b2b66ecfb4820e46dfa66ffd40';

	constructor(private configService: ConfigService, private credentialService: CredentialService) {
		this.linkedCredentials = 0;
		this.hasCredentials = false;
		this.invalidCredentials = false;
		this.lastLoggedIn = new Date();
		this.validCredentials = false;
		this.facebookSuccess = false;
	}

	initMixpanel() {
		if (isDevMode()) {
			mixpanel.init(this.mixpanelDevMode);
		} else {
			mixpanel.init(this.mixpanelProdId);
		}
	}

	setIdentify(id?: string) {
		id ? mixpanel.identify(id) : mixpanel.identify(this.configService.getUser.id);
	}

	setTrackEvent(event: any, property?: any) {
		property ? mixpanel.track(event, property) : mixpanel.track(event);
	}

	setSignupPeopleProperties(email: string, created: Date, userId?: string) {
		mixpanel.alias(userId ? userId : this.configService.getUser.id);
		mixpanel.people.set({ $email: email });
		mixpanel.people.set({ $created: created });
	}

	setSuperProperties() {
		this.credentialService.getAllCredentials().subscribe((res) => {
			this.hasCredentials = res.body.size !== 0;
			this.linkedCredentials = res.body.size;
			mixpanel.people.set({
				'Has credentials': this.hasCredentials,
				'Linked credentials': this.linkedCredentials
			});
		});
	}

	setPeopleProperties() {
		this.credentialService.getAllCredentials().subscribe((res) => {
			res.body.data.forEach((credential) => {
				if (credential.status != 'ACTIVE') {
					this.invalidCredentials = true;
				} else {
					this.validCredentials = true;
				}
			});
			mixpanel.people.set('Invalid credentials', this.invalidCredentials);
			mixpanel.people.set('Valid credentials', this.validCredentials);
			mixpanel.people.set('Last logged in', this.lastLoggedIn);
		});
	}

	set setFacebookSuccess(data: boolean) {
		this.facebookSuccess = data;
	}

	get getFacebookSuccess(): boolean {
		return this.facebookSuccess;
	}
}
