import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output,
	ViewChild,
	Renderer2
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MovementsService } from '@services/movements/movements.service';
import { ToastService } from '@services/toast/toast.service';
import { CleanerService } from '@services/cleaner/cleaner.service';

import { ToastInterface } from '@interfaces/toast.interface';
import { NewMovement } from '@interfaces/newMovement.interface';

import * as M from 'materialize-css/dist/js/materialize';
import { retry } from 'rxjs/operators';
import { DateApiService } from '@services/date-api/date-api.service';
@Component({
	selector: 'app-new-movement',
	templateUrl: './new-movement.component.html',
	styleUrls: [ './new-movement.component.css' ]
})
export class NewMovementComponent implements OnInit, AfterViewInit {
	@ViewChild('duplicated') checkboxDuplicate: ElementRef;
	@ViewChild('modal') modalElement: ElementRef;
	@ViewChild('datepicker') elDatePickker: ElementRef;
	@ViewChild('btnSubmit') buttonSubmit: ElementRef;

	@Output() createMovementStatus: EventEmitter<boolean>;

	newMovement: NewMovement;
	formatDate: string;
	date: Date;
	toastInterface: ToastInterface;
	instaceModal;

	constructor(
		private movementService: MovementsService,
		private dateApiService: DateApiService,
		private toastService: ToastService,
		private cleanerService: CleanerService,
		private renderer: Renderer2
	) {
		this.newMovement = {
			date: this.dateApiService.dateApi(new Date()),
			type: 'charge'
		};
		this.date = new Date();
		this.createMovementStatus = new EventEmitter();
		this.toastInterface = { code: null, message: null };
	}

	ngOnInit() {
		this.formatDate = this.dateApiService.dateFormatMovement(this.date);
	}

	ngAfterViewInit() {
		const initModal = new M.Modal(this.modalElement.nativeElement, {});
		this.instaceModal = M.Modal.getInstance(this.modalElement.nativeElement);
	}

	createMovement(form: NgForm) {
		form.value.date = this.newMovement.date;
		form.value.type = this.newMovement.type;
		this.renderer.addClass(this.buttonSubmit.nativeElement, 'disabled');
		this.movementService.createMovement(form.value).subscribe(
			(res) => {
				this.createMovementStatus.emit(true);
				this.toastInterface.code = res.status;
			},
			(err) => {
				this.toastInterface.code = err.status;
				if (err.status === 401) {
					this.toastService.toastGeneral(this.toastInterface);
					this.createMovement(form);
				}
				if (err.status === 500) {
					this.toastInterface.message = '¡Ha ocurrido un error al obterner tus movimiento!';
					this.toastService.toastGeneral(this.toastInterface);
				}
			},
			() => {
				this.cleanerService.cleanBudgetsVariables();
				this.cleanerService.cleanDashboardVariables();
				this.instaceModal.close();
				this.renderer.removeClass(this.buttonSubmit.nativeElement, 'disabled');
				form.resetForm();
				this.toastInterface.message = 'Se creó su movimiento exitosamente';
				this.toastService.toastGeneral(this.toastInterface);
			}
		);
	}

	valueType(type: string) {
		if (type === 'deposit') {
			document.getElementById('charge').classList.remove('active');
			document.getElementById('deposit').classList.add('active');
		} else {
			document.getElementById('deposit').classList.remove('active');
			document.getElementById('charge').classList.add('active');
		}
		this.newMovement.type = type;
	}
}
