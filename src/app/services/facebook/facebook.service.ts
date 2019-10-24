import { Injectable } from '@angular/core';

declare var fbq: any;

@Injectable({
	providedIn: 'root'
})
export class FacebookService {
	constructor() { }

	callSDK() {
		(function (d, s, id) {
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
	}

	initFacebookPixel() {
		fbq('init', '893739344353016');
	}

	trackEvent(event: string) {
		fbq('trackCustom', event);
	}
}
