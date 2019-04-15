import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-empty-states',
	templateUrl: './empty-states.component.html',
	styleUrls: [ './empty-states.component.css' ]
})
export class EmptyStatesComponent implements OnInit {
	@Input() imgName: String;
	@Input() title: String;
	@Input() description: String;
	@Input() buttonText: String;
	@Input() buttonUrl: String;
	assetsUrlDefault: String;

	constructor() {}

	ngOnInit() {
		this.assetsUrlDefault = `/assets/media/img/empty_states/${this.imgName}_empty_state.svg`;
	}
}
