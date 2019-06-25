import { Component, OnInit, Input, isDevMode, Output, EventEmitter } from '@angular/core';
declare const FB: any;

@Component({
	selector: 'app-social-media',
	templateUrl: './social-media.component.html',
	styleUrls: [ './social-media.component.css' ]
})
export class SocialMediaComponent implements OnInit {
	@Input() facebookText: string;
	@Input() googleText: string;
	url: string;

	@Output() onLoginEvent: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	ngOnInit() {
		if (isDevMode() === true) {
			this.url = 'http://localhost:4200';
		} else {
			this.url = 'https://app.finerio.mx';
		}
	}

	ngAfterViewInit(): void {
		this.getLoginStatus();
	}

	getLoginStatus() {
		FB.getLoginStatus((response) => {
			if (response.status === 'connected') {
				this.onLoginEvent.emit(true);
			}
		});
	}
}
