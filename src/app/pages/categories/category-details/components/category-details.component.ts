import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { CategoriesService } from '@services/categories/categories.service';
import { ToastService } from '@services/toast/toast.service';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';
import * as M from 'materialize-css/dist/js/materialize';

@Component({
	selector: 'app-category-details',
	templateUrl: './category-details.component.html',
	styleUrls: [ './category-details.component.css' ]
})
export class CategoryDetailsComponent implements OnInit {
	categoryToShow: Category;
	setHeightToCol: string = '';
	showSpinner: boolean = false;
	@ViewChild('deleteModal') elModal: ElementRef;

	constructor(
		private categoriesBeanService: CategoriesBeanService,
		private router: Router,
		private categoriesService: CategoriesService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.getCategoryToShow();
		this.settingDimensionOfCatContainer();
	}

	ngAfterViewInit() {
		const ELMODAL = new M.Modal(this.elModal.nativeElement);
	}

	deleteUserCategory() {
		this.showSpinner = true;
		this.disableButtons();
		this.categoriesService.deleteCategory(this.categoryToShow).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
				this.toastService.setMessage = '¡Categoría elminada con éxito!';
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

	getCategoryToShow() {
		this.categoryToShow = this.categoriesBeanService.getCategoryToViewDetails();
		this.sortingColors();
		isNullOrUndefined(this.categoryToShow) ? this.router.navigateByUrl('/app/categories') : null;
	}

	sortingColors() {
		this.categoryToShow.subCategories.sort((a, b) => {
			if (a.color > b.color) {
				return 1;
			} else if (a.color < b.color) {
				return -1;
			} else {
				return 0;
			}
		});
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

	disableButtons() {
		(<HTMLButtonElement>document.querySelector('#deleteCategoryButton')).disabled = true;
		(<HTMLButtonElement>document.querySelector('#createSubCategoryButton')).disabled = true;
	}

	openDeleteModal() {
		const INSTANCEMODAL = M.Modal.getInstance(this.elModal.nativeElement);
		INSTANCEMODAL.open();
	}
}
