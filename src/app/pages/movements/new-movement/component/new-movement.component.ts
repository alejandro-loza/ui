import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MovementsService } from '@services/movements/movements.service';
import { AccountService } from '@services/account/account.service';
import { ToastService } from '@services/toast/toast.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { CategoriesHelperService } from '@services/categories/categories-helper.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalCategoriesComponent } from '@components/modal-categories/component/modal-categories.component';

import { NewMovement } from '@interfaces/newMovement.interface';
import * as M from 'materialize-css/dist/js/materialize';
import { AccountInterface } from '@app/interfaces/account.interfaces';
import { isNullOrUndefined } from 'util';
import { Category } from '@app/interfaces/category.interface';

@Component({
	selector: 'app-new-movement',
	templateUrl: './new-movement.component.html',
	styleUrls: [ './new-movement.component.css' ]
})
export class NewMovementComponent implements OnInit, AfterViewInit {
	@ViewChild('duplicated') checkboxDuplicate: ElementRef;
	@ViewChild('manualAccountsModal') manualAccountsModal: ElementRef;
	@ViewChild('datepicker') elDatePickker: ElementRef;
	@ViewChild('btnSubmit') buttonSubmit: ElementRef;

	manualAccount: AccountInterface;
	manualAccountNature: string;
	manualAccountName: string;
	disableModalTrigger: boolean = true;

	categoriesList: Category[] = [];

	newMovement: NewMovement;
	preCategory: Category;
	date: Date;

	reset: boolean;
	loaderSpinner: boolean = true;
	formatDate: string;
	showSpinner: boolean = true;

	constructor(
		private movementService: MovementsService,
		private cleanerService: CleanerService,
		private toastService: ToastService,
		private renderer: Renderer2,
		private router: Router,
		private accountService: AccountService,
		private categoriesService: CategoriesService,
		private categoriesHelperService: CategoriesHelperService,
		private matDialog: MatDialog,
		private categoriesBeanService: CategoriesBeanService
	) {
		this.formatDate = 'Otro...';
		this.newMovement = {
			date: new Date(),
			type: 'charge'
		};
		this.date = new Date();
		this.reset = false;
		this.categoriesList = this.categoriesBeanService.getCategories();
	}

	ngOnInit() {
		this.fillNoPreCat();
	}

	ngAfterViewInit() {
		const modal = new M.Modal(this.manualAccountsModal.nativeElement);
	}

	fillNoPreCat() {
		this.preCategory = {
			color: '#AAAAAA',
			textColor: '#FFFFFF',
			id: null,
			name: 'Sin categoría',
			parent: {
				id: 'finerio-icon'
			}
		};
	}

	// Function called from HTML
	preliminarCategory() {
		let income = this.newMovement.type == 'INCOME' ? true : false;
		let categoryId: string;
		this.categoriesService.getPreliminarCategory(this.newMovement.description, income).subscribe((res) => {
			categoryId = res.body.categoryId;
			if (categoryId == undefined) {
				this.fillNoPreCat();
			} else {
				this.getEntireCategory(categoryId);
			}
		});
	}

	getEntireCategory(categoryId: string) {
		this.categoriesService.getCategoriesInfo().subscribe((res) => {
			this.categoriesList = res.body;
			this.newMovement.category = this.categoriesHelperService.getCategoryById(categoryId, res.body);
			this.preCategory = this.newMovement.category;
			this.preCategory.parent = {
				id: this.categoriesHelperService.getParentCategoryId(this.preCategory.id, res.body)
			};
		});
	}

	submitPorcess(form: NgForm) {
		document.querySelector('#spinner').classList.add('d-block');
		(<HTMLButtonElement>document.querySelector('#submitButton')).disabled = true;

		this.manualAccount === undefined ? this.createMovement(form) : this.createManualAccountMovement();
	}

	createManualAccountMovement() {
		this.newMovement.category = this.preCategory;
		this.movementService.createManualAccountMovement(this.newMovement, this.manualAccount.id).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(err) => {
				this.toastService.setCode = err.status;
				if (err.status === 401) {
					this.toastService.toastGeneral();
					this.createManualAccountMovement();
				}
				if (err.status === 500) {
					this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
					this.toastService.toastGeneral();
				}
			},
			() => {
				this.cleanerService.cleanAllVariables();
				this.reset = true;
				this.toastService.setMessage = 'Se creó su movimiento exitosamente';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/movements');
			}
		);
	}

	createMovement(form: NgForm) {
		this.movementService.createMovement(this.newMovement).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(err) => {
				this.toastService.setCode = err.status;
				if (err.status === 401) {
					this.toastService.toastGeneral();
					this.createMovement(form);
				}
				if (err.status === 500) {
					this.toastService.setMessage = '¡Ha ocurrido un error al crear tu movimiento!';
					this.toastService.toastGeneral();
				}
			},
			() => {
				this.cleanerService.cleanAllVariables();
				this.reset = true;
				this.toastService.setMessage = 'Se creó su movimiento exitosamente';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/movements');
			}
		);
	}

	manualAccountSelected(account: AccountInterface) {
		setTimeout(() => {
			let withoutDefault = isNullOrUndefined(account);
			if (!withoutDefault) {
				this.manualAccount = account;
				this.manualAccountName = this.manualAccount.name;
				this.manualAccountNature = this.accountService.getManualAccountNatureWithOutDefaults(
					this.manualAccount.nature
				);
			} else {
				this.manualAccountName = 'Efectivo';
				this.manualAccountNature = 'ma_cash'; // Just for get the image
			}
			this.loaderSpinner = false;
		}, 500);
	}

	modalManualaccountsTrigger(noManualAccounts: boolean) {
		this.disableModalTrigger = noManualAccounts;
	}

	// function for HTML Buttons
	valueType(id: string) {
		this.renderer.removeClass(document.querySelector('.btn-type.active'), 'active');
		this.renderer.addClass(document.getElementById(id), 'active');
		this.newMovement.type = id;
	}

	// function for HTML
	changeClassDate(id: string) {
		const auxDate = new Date();
		this.renderer.removeClass(document.querySelector('.btn-date.active'), 'active');
		this.renderer.addClass(document.getElementById(id), 'active');
		if (id === 'yesterdayDate') {
			const newdate = auxDate.getDate() - 1;
			auxDate.setDate(newdate);
		} else if (id === 'otherDate') {
			return;
		}
		this.newMovement.date = auxDate;
	}

	// Categories process

	openDialog(event: Event) {
		event.stopPropagation();
		let matDialogConfig: MatDialogConfig<any>;
		matDialogConfig = {
			autoFocus: true,
			disableClose: true,
			closeOnNavigation: true,
			restoreFocus: true,
			width: '80%',
			data: {
				categoryList: this.categoriesList
			}
		};
		const matDialogRef = this.matDialog.open(ModalCategoriesComponent, matDialogConfig);
		matDialogRef.afterClosed().subscribe(
			(res) => {
				if (!isNullOrUndefined(res)) {
					this.preCategory = res;
				}
			},
			(err) => {
				this.toastService.setCode = err.code;
				if (err.code === 500) {
					const message = 'Ocurrío un error al cambiar la categoría';
					this.toastService.setMessage = message;
				}
				this.toastService.toastGeneral();
			},
			() => {
				if (!isNullOrUndefined(this.preCategory.userId)) {
					this.preCategory.parent = {
						id: 'userCategory'
					};
				}
			}
		);
	}
}
