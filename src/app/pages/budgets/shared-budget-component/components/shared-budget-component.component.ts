import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BudgetsBeanService } from '@services/budgets/budgets-bean.service';
import { ToastService } from '@services/toast/toast.service';
import { BudgetsService } from '@services/budgets/budgets.service';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import { NewBudget, SubBudget } from '@interfaces/budgets/new-budget.interface';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import { editBudgetAux } from '@app/interfaces/budgets/editBudgetAux.interface';

@Component({
	selector: 'app-shared-budget-component',
	templateUrl: './shared-budget-component.component.html',
	styleUrls: [ './shared-budget-component.component.css' ]
})
export class SharedBudgetComponentComponent implements OnInit {
	routeForBackButton: string;
	editModeOfTheComponent: boolean;
	ngModelAux: editBudgetAux[] = [];
	categoryWithUserIdProperty: boolean = false;
	setHeightToCol: string = '';
	budgetToEdit: Budget = null;
	categorySelected: Category = null;
	budgetToCreate: NewBudget = {
		amount: 0,
		category: null,
		subBudgets: [],
		user: { id: '' }
	};
	categoryInputModel: number = 0;
	subBudgets: SubBudget[] = [];
	showSpinner: boolean = false;

	constructor(
		private budgetsBeanService: BudgetsBeanService,
		private router: Router,
		private budgetsService: BudgetsService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute
	) {
		this.categorySelected = this.budgetsBeanService.getCategoryToSharedComponent();
		this.budgetToEdit = this.budgetsBeanService.getBudgetToEdit();
		if (isNullOrUndefined(this.categorySelected) && isNullOrUndefined(this.budgetToEdit)) {
			this.router.navigateByUrl('/app/budgets');
		}
		this.activatedRoute.params.subscribe((params) => {
			this.editModeOfTheComponent = params['action'] === 'edit' ? true : false;
		});
	}

	ngOnInit() {
		this.settingDimensionOfCatContainer();
		this.selectIconToShow();
		this.setAmountOfParentCategory();
		if (!isNullOrUndefined(this.categorySelected.subCategories)) {
			this.sortingColors();
			this.settingFunctionalityOfTheComponent();
		}
		this.backButtonRoute();
	}

	setAmountOfParentCategory() {
		if (this.editModeOfTheComponent) {
			this.categoryInputModel = this.budgetToEdit.amount;
		} else {
			this.categoryInputModel = 0;
		}
	}

	selectIconToShow() {
		if (this.editModeOfTheComponent) {
			if (this.categorySelected.user) {
				this.categoryWithUserIdProperty = true;
			}
		} else {
			if (this.categorySelected.userId) {
				this.categoryWithUserIdProperty = true;
			}
		}
	}

	sortingColors() {
		this.categorySelected.subCategories.sort((a, b) => {
			if (a.color > b.color) {
				return 1;
			} else if (a.color < b.color) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	fillInputs() {
		for (let i = 0; i < this.ngModelAux.length; i++) {
			if (!isNullOrUndefined(this.budgetToEdit.subBudgets)) {
				this.budgetToEdit.subBudgets.forEach((subBudget) => {
					if (subBudget.name == this.ngModelAux[i].name) {
						this.ngModelAux[i].value = subBudget.amount;
					}
				});
			}
		}
	}

	submit(form: NgForm) {
		this.showSpinner = true;
		(<HTMLButtonElement>document.querySelector('#submitBtn')).disabled = true;
		setTimeout(() => {
			this.editModeOfTheComponent ? this.doDataProcessForPUT(form) : this.doDataProcessForPost(form);
		}, 100);
	}

	modifyingBudget() {
		this.budgetToEdit.amount = this.categoryInputModel;
		this.budgetToEdit.subBudgets = this.subBudgets;
	}

	makeNewBudgetStructure() {
		this.budgetToCreate.amount = this.categoryInputModel;
		this.budgetToCreate.category = this.categorySelected;
		this.budgetToCreate.subBudgets = this.subBudgets;
	}

	fillSubBudgetsForEditOption(form: NgForm, key: string) {
		if (form.value[key] != 0) {
			this.subBudgets.push({
				amount: form.value[key],
				category: this.getSubcategory(key),
				name: key,
				id: '',
				spentAmount: 0,
				spentPercentage: 0,
				user: {
					id: ''
				}
			});
		}
	}

	fillSubBudgets(form: NgForm, key: string) {
		if (form.value[key] != 0) {
			this.subBudgets.push({
				amount: form.value[key],
				category: this.getSubcategory(key),
				name: key,
				id: '',
				spentAmount: 0,
				spentPercentage: 0,
				user: {
					id: ''
				}
			});
		}
	}

	getTotalAmount(form: NgForm) {
		let totalAmount: number = 0;
		this.categoryInputModel = 0;
		let ARRAY_WITH_KEYS: any[] = [];

		ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (typeof form.value[key] === 'number' && key != this.categorySelected.name) {
				totalAmount += form.value[key];
			}
		});
		this.categoryInputModel = totalAmount;
	}

	cleanSubcatsInput(form: NgForm) {
		const ARRAY_WITH_KEYS = Object.keys(form.value);

		for (let i = 0; i < ARRAY_WITH_KEYS.length; i++) {
			if (ARRAY_WITH_KEYS[i] !== this.categorySelected.name) {
				form.controls[ARRAY_WITH_KEYS[i]].setValue(0);
				(<HTMLInputElement>document.getElementById(ARRAY_WITH_KEYS[i])).value = '';
			}
		}
	}

	getSubcategory(name: string): Category {
		let subcategoryVar: Category = null;
		this.categorySelected.subCategories.forEach((subcategory) => {
			subcategory.name == name ? (subcategoryVar = subcategory) : null;
		});
		return subcategoryVar;
	}

	settingFunctionalityOfTheComponent() {
		this.categorySelected.subCategories.forEach((subcat) => {
			this.ngModelAux.push({ name: subcat.name });
		});
		if (this.editModeOfTheComponent) {
			this.fillInputs();
		}
	}

	backButtonRoute() {
		this.routeForBackButton = this.editModeOfTheComponent
			? `/app/budgets/${this.categorySelected.name}`
			: '/app/budgets/new-budget';
	}

	settingDimensionOfCatContainer() {
		setTimeout(() => {
			this.setHeightToCol = this.getHeightOfSubcatsContainer().toString() + 'px';
		}, 50);
	}

	getHeightOfSubcatsContainer(): number {
		let height = 0;
		height = document.getElementById('divToGetHeight').clientHeight;
		return height;
	}

	// MTHOD FOR UPDATES TO BUDGETS
	doDataProcessForPUT(form: NgForm) {
		const ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (typeof form.value[key] === 'number' && key !== this.categorySelected.name) {
				this.fillSubBudgetsForEditOption(form, key);
			}
		});
		this.modifyingBudget();
		this.budgetsService.updateBudget(this.budgetToEdit).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(errors) => {
				this.toastService.setCode = errors.status;
				this.toastService.setMessage = 'Ocurrió un error, porfavor intenta de nuevo';
				this.toastService.toastGeneral();
				this.budgetsBeanService.setLoadInformation(true);
				return this.router.navigateByUrl('/app/budgets');
			},
			() => {
				this.toastService.setMessage = 'Presupuesto modificado con éxito';
				this.toastService.toastGeneral();
				this.budgetsBeanService.setLoadInformation(true);
				return this.router.navigateByUrl('/app/budgets');
			}
		);
	}

	// MTHOD FOR NEW BUDGETS
	doDataProcessForPost(form: NgForm) {
		const ARRAY_WITH_KEYS = Object.keys(form.value);
		ARRAY_WITH_KEYS.forEach((key) => {
			if (typeof form.value[key] === 'number' && key !== this.categorySelected.name) {
				this.fillSubBudgets(form, key);
			}
		});
		this.makeNewBudgetStructure();
		this.budgetsService.createBudget(this.budgetToCreate).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
			},
			(error) => {
				this.toastService.setCode = error.error.status;
				this.toastService.setMessage = 'Ocurrió un error, porfavor intenta de nuevo';
				this.toastService.toastGeneral();
				this.budgetsBeanService.setLoadInformation(true);
				return this.router.navigateByUrl('/app/budgets');
			},
			() => {
				this.budgetsBeanService.setLoadInformation(true);
				this.toastService.setMessage = 'Presupuesto creado con éxito';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/budgets');
			}
		);
	}
}
