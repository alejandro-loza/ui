import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { CategoriesService } from '@services/categories/categories.service';
import { ToastService } from '@services/toast/toast.service';
import { Category } from '@app/interfaces/category.interface';
import { WorkshopCategory } from '@app/interfaces/categories/workshopCategory.interface';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'app-subcategory-workshop',
	templateUrl: './subcategory-workshop.component.html',
	styleUrls: [ './subcategory-workshop.component.css' ]
})
export class SubcategoryWorkshopComponent implements OnInit {
	editMode: boolean;
	parentCategory: Category;
	setHeightToCol: string = '';
	colorForSubcategory: string[] = [];
	subcategoryToEdit: Category;
	subcategoryName: string = '';
	colorForDemoChip: string = '';

	subcategoryStruct: WorkshopCategory = {};
	showSpinner: boolean = false;

	@ViewChild('deleteModal') elModal: ElementRef;

	constructor(
		private categoriesBeanService: CategoriesBeanService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private categoriesService: CategoriesService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getComponentMode();
		this.getCategoryToShow();
		this.settingDimensionOfCatContainer();
		this.calculateBakgrounds();
	}

	ngAfterViewInit() {
		const ELMODAL = new M.Modal(this.elModal.nativeElement);
	}

	submitFunction() {
		this.showSpinner = true;
		this.editMode ? this.updateSubcategory() : this.createSubcategory();
	}

	createSubcategory() {
		this.makeSubcategoryStruct();
		this.disableButtons();
		this.categoriesService.createCategoryOrSubcategory(this.subcategoryStruct).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
				this.toastService.setMessage = 'Subcategoría creada con éxito!';
				this.toastService.toastGeneral();
				this.categoriesBeanService.setCategories([]);
				return this.router.navigateByUrl('/app/categories');
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Algo salió mal, inténtalo más tarde';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/categories');
			}
		);
	}

	deleteUserSubcategory() {
		this.showSpinner = true;
		this.disableButtons();
		this.categoriesService.deleteCategoryOrSubcategory(this.subcategoryToEdit).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
				this.toastService.setMessage = 'Subcategoría eliminada con éxito!';
				this.toastService.toastGeneral();
				this.categoriesBeanService.setCategories([]);
				return this.router.navigateByUrl('/app/categories');
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Algo salió mal, inténtalo más tarde';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/categories');
			}
		);
	}

	makeSubcategoryStruct() {
		this.subcategoryStruct.name = this.subcategoryName;
		this.subcategoryStruct.color = this.colorForDemoChip;
		this.subcategoryStruct.textColor = '#FFFFFF';
		this.subcategoryStruct.parent = this.parentCategory;
	}

	updateSubcategory() {
		this.disableButtons();
		this.prepareSubmitForUpdate();
		this.categoriesService.updateCategoryOrSubcategory(this.subcategoryStruct).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
				this.toastService.setMessage = 'Subcategoría modificada con éxito!';
				this.toastService.toastGeneral();
				this.categoriesBeanService.setCategories([]);
			},
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Algo salió mal, inténtalo más tarde';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/categories');
			},
			() => {
				return this.router.navigateByUrl('/app/categories');
			}
		);
	}

	prepareSubmitForUpdate() {
		this.subcategoryStruct.name = this.subcategoryName;
		this.subcategoryStruct.textColor = this.subcategoryToEdit.textColor;
		this.subcategoryStruct.id = this.subcategoryToEdit.id;
		this.subcategoryStruct.color = this.colorForDemoChip;
		this.subcategoryStruct.parent = this.parentCategory;
	}

	calculateBakgrounds() {
		let parentColor: string = this.parentCategory.color;
		parentColor = parentColor.slice(1);
		let decimalColor = parseInt(parentColor, 16);
		let endFor: boolean = false;
		let availableColor: boolean = true;

		for (let i = 500; !endFor; i += 500) {
			let decimalAux = decimalColor - i;
			let hexAux = decimalAux.toString(16);
			if (this.parentCategory.subCategories) {
				this.parentCategory.subCategories.forEach((subCategory) => {
					if (subCategory.color == hexAux) {
						availableColor = false;
					}
				});
			}
			if (availableColor) this.colorForSubcategory.push('#' + hexAux);
			if (this.colorForSubcategory.length == 10) endFor = true;
		}
		this.colorForDemoChip = this.colorForSubcategory[0];
	}

	selectedBackground(color: string) {
		this.colorForDemoChip = color;
	}

	getCategoryToShow() {
		this.parentCategory = this.categoriesBeanService.getCategoryToViewDetails();
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

	openDeleteModal() {
		const INSTANCEMODAL = M.Modal.getInstance(this.elModal.nativeElement);
		INSTANCEMODAL.open();
	}

	disableButtons() {
		if (this.editMode) {
			(<HTMLButtonElement>document.querySelector('#deleteCategoryButton')).disabled = true;
		}
		(<HTMLButtonElement>document.querySelector('.createSubCategoryButton')).disabled = true;
	}

	setupForEditMode() {
		this.subcategoryToEdit = this.categoriesBeanService.getSubcategoryToViewDetails();
		this.subcategoryName = this.subcategoryToEdit.name;
		this.colorForDemoChip = this.subcategoryToEdit.color;
		this.colorForSubcategory.push(this.subcategoryToEdit.color);
	}

	getComponentMode() {
		this.activatedRoute.params.subscribe((params) => {
			this.editMode = params['mode'] === 'new' ? false : true;
		});
		if (this.editMode) {
			this.setupForEditMode();
		}
	}
}
