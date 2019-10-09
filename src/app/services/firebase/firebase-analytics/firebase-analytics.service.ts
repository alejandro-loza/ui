import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import 'firebase/analytics';

import * as firebase from 'firebase/app';

@Injectable({
	providedIn: 'root'
})
export class FirebaseAnalyticsService {
	constructor() {}

	initApplication() {
		firebase.initializeApp(environment.firebaseConfig);
	}

	trackEvent(eventName: string) {
		firebase.analytics().logEvent(eventName);
	}
}
