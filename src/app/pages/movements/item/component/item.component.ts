import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { AccountService } from '@services/account/account.service';
import { MovementsService } from '@services/movements/movements.service';
import { StatefulMovementsService } from '@services/stateful/movements/stateful-movements.service';
import { EditMovementListService } from '@services/movements/edit-list/edit-movement-list.service';
import { ToastService } from '@services/toast/toast.service';

import { Movement } from '@interfaces/movement.interface';

import { Subscription } from 'rxjs';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.css' ]
})
export class ItemComponent implements OnInit {
	@Input() movement: Movement;
	@Output() movementChange: EventEmitter<Movement>;
	@Output() editMovement: EventEmitter<void>;

	switcherSubscription: Subscription;

	traditionalImgSrc: string;
	manualAccountImgSrc: string;
	accountWithOutDefaults: string;

	constructor(
		private accountService: AccountService,
		private movementsService: MovementsService,
		private statefulMovementsService: StatefulMovementsService,
		private editMovementListService: EditMovementListService,
		private toastService: ToastService
	) {
		this.editMovement = new EventEmitter();
		this.movementChange = new EventEmitter();
	}

	ngOnInit() {
		this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(
			this.movement.account.type
		);
		this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
		this.traditionalImgSrc = `assets/media/img/banks/shields/${this.movement.account.institution.code.toLocaleLowerCase()}_shield.png`;
	}

	onErrorFunc(type: string) {
		this.accountWithOutDefaults = this.accountService.getManualAccountNatureWithOutDefaults(type);
		this.manualAccountImgSrc = `assets/media/img/manual_account/${this.accountWithOutDefaults}.svg`;
	}

	updateMovement(movement: Movement) {
		this.switcherSubscription = this.movementsService.updateMovement(movement).subscribe(
			(res) => {
				this.statefulMovementsService.setMovement = movement;
				this.toastService.setCode = res.status;
			},
			(err) => {
				this.toastService.setCode = err.status;
				if (err.status === 401) {
					this.toastService.toastGeneral();
					this.updateMovement(movement);
				}
				if (err.status === 500) {
					this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
					this.toastService.toastGeneral();
				}
			},
			() => {
				this.editMovementListService.editMovement();
				this.toastService.setMessage = 'Se editó su movimiento exitosamente';
				this.toastService.toastGeneral();
				this.switcherSubscription.unsubscribe();
			}
		);
	}

	changeDuplicated(changed: boolean) {
		this.movement = { ...this.movement, duplicated: changed };
		this.updateMovement(this.movement);
		this.movementChange.next(this.movement);
	}
}
