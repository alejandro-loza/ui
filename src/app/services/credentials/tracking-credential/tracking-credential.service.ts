import { Injectable } from '@angular/core';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { FirebaseAnalyticsService } from '@services/firebase/firebase-analytics/firebase-analytics.service';
import { CredentialInterface } from '@interfaces/credentials/credential.interface';
import { isUndefined } from 'util';

@Injectable({
	providedIn: 'root'
})
export class TrackingCredentialService {
	constructor(private mixpanel: MixpanelService, private firebaseAnalyticsService: FirebaseAnalyticsService) {}

	createCredential(credential: CredentialInterface) {
		const create = 'Create Credential';
		this.firebaseAnalyticsService.trackEvent('create_credential');
		this.mixpanelEvent(credential, create);
	}

	editCredential(credential: CredentialInterface) {
		const update = 'Edit Credential';
		this.mixpanel.setIdentify();
		this.mixpanel.setTrackEvent(update, { bank: credential.institution.code });
	}

	syncingCredential(credential: CredentialInterface) {
		let event: string;

		if (credential.status === 'ACTIVE') {
			event = 'Successful syncing';
		} else if (credential.status === 'INVALID') {
			event = 'Failed syncing';
		} else if (credential.status === 'TOKEN') {
			this.mixpanel.setIdentify();
			this.mixpanel.setTrackEvent('Introduce token');
		}

		if (!isUndefined(event)) {
			this.mixpanelEvent(credential, event);
		}
	}

	private mixpanelEvent(credential: CredentialInterface, event: string) {
		this.mixpanel.setIdentify();
		this.mixpanel.setTrackEvent(event, { bank: credential.institution.code });
	}
}
