import { Component, OnInit } from '@angular/core';
import { MobileService } from '@services/mobile/mobile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-mobile',
	templateUrl: './mobile.component.html',
	styleUrls: [ './mobile.component.css' ]
})
export class MobileComponent implements OnInit {
	mobileOperatingSystem: string;

	constructor(private mobileService: MobileService, private router: Router) {
		this.mobileOperatingSystem = this.mobileService.mobileOperatingSystem;
		if (!this.mobileService.mobilecheck()) {
			this.router.navigate([ '/access', 'login' ]);
		}
	}

	ngOnInit() {}
}
