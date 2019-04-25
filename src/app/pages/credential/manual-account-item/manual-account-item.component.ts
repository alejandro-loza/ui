import { Component, OnInit, Input } from '@angular/core';
import { AccountInterface } from '@app/interfaces/account.interfaces';

@Component({
	selector: 'app-manual-account-item',
	templateUrl: './manual-account-item.component.html',
	styleUrls: [ './manual-account-item.component.css' ]
})
export class ManualAccountItemComponent implements OnInit {
	@Input() manualAccount: AccountInterface;

	constructor() {}

	ngOnInit() {}
}
