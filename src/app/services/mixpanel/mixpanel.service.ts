import { Injectable } from '@angular/core';
import { ConfigService } from '@services/config/config.service';
declare var mixpanel: any;

@Injectable({
	providedIn: 'root'
})
export class MixpanelService {
	constructor(private configService: ConfigService) {}

	setIdentify() {
		mixpanel.identify(this.configService.getUser.id);
	}

	setTrackEvent(event: any) {
		mixpanel.track(event);
	}
}
