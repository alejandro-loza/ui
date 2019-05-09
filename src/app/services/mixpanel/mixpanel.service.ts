import { Injectable } from '@angular/core';
import { ConfigService } from '@services/config/config.service';
import { CredentialService } from '@services/credentials/credential.service';
declare var mixpanel: any;

@Injectable({
	providedIn: 'root'
})
export class MixpanelService {
	hasCredentials: boolean;
	linkedCredentials: number;

	constructor(private configService: ConfigService, private credentialService: CredentialService) {
		this.linkedCredentials = 0;
		this.hasCredentials = false;
	}

	setIdentify() {
		mixpanel.identify(this.configService.getUser.id);
	}

	setTrackEvent(event: any) {
		mixpanel.track(event);
	}

	setSuperProperties() {
		this.credentialService.getAllCredentials().subscribe((res) => {
			this.hasCredentials = res.body.size !== 0;
			this.linkedCredentials = res.body.size;
			mixpanel.register({
				'Has credentials': this.hasCredentials,
				'Linked credentials': this.linkedCredentials
			});
		});
	}
}
