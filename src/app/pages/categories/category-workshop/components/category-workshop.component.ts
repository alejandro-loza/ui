import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@services/categories/categories.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { ToastService } from '@services/toast/toast.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { WorkshopCategory } from '@app/interfaces/categories/workshopCategory.interface';

@Component({
	selector: 'app-category-workshop',
	templateUrl: './category-workshop.component.html',
	styleUrls: [ './category-workshop.component.css' ]
})
export class CategoryWorkshopComponent implements OnInit {
	editMode: boolean = false;
	colorForCategory: String[] = [];

	// Variables to API
	colorForDemoChip: String = '';
	categoryName: String = '';

	// AUX
	showSpinner: boolean = false;

	categoryStruct: WorkshopCategory = {};

	constructor(
		private activatedRoute: ActivatedRoute,
		private categoriesService: CategoriesService,
		private router: Router,
		private toastService: ToastService,
		private categoriesBeanService: CategoriesBeanService,
		private cleanerService: CleanerService
	) {}

	ngOnInit() {
		this.getComponentMode();
		this.generateRandomColors();
	}

	setupForEditMode() {
		let category = this.categoriesBeanService.getCategoryToViewDetails();
		this.categoryName = category.name;
		this.colorForDemoChip = category.color;
		this.colorForCategory.push(this.colorForDemoChip);
	}

	submitCategory() {
		this.cleanerService.cleanBudgetsVariables();
		this.cleanerService.cleanDashboardVariables();
		this.editMode ? this.updateCategory() : this.createCategory();
	}

	updateCategory() {
		this.prepareSubmitForUpdate();
		this.categoriesService.updateCategoryOrSubcategory(this.categoryStruct).subscribe(
			(res) => {
				this.toastService.setCode = res.status;
				this.toastService.setMessage = '¡Categoría modificada con éxito!';
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

	createCategory() {
		this.prepareSubmit();
		this.categoriesService.createCategoryOrSubcategory(this.categoryStruct).subscribe((res) => {
			this.toastService.setCode = res.status;
			this.toastService.setMessage = '¡Categoría creada con éxito!';
			this.toastService.toastGeneral();
			this.categoriesBeanService.setCategories([]);
			return this.router.navigateByUrl('/app/categories');
		}),
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Algo salió mal, inténtalo más tarde';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/categories');
			};
	}

	generateRandomColors() {
		while (this.colorForCategory.length <= 10) {
			let color = '#000000'.replace(/0/g, function() {
				return (~~(Math.random() * 16)).toString(16);
			});
			this.noLightColorsFilter(color);
		}
		this.colorForDemoChip = this.colorForCategory[0];
	}

	noLightColorsFilter(hexColor: string) {
		let c = hexColor.substring(1); // strip #
		let rgb = parseInt(c, 16); // convert rrggbb to decimal
		let r = (rgb >> 16) & 0xff; // extract red
		let g = (rgb >> 8) & 0xff; // extract green
		let b = (rgb >> 0) & 0xff; // extract blue

		let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
		if (luma < 150) {
			this.colorForCategory.push(hexColor);
		}
	}

	prepareSubmitForUpdate() {
		let category = this.categoriesBeanService.getCategoryToViewDetails();
		this.categoryStruct.name = this.categoryName;
		this.categoryStruct.color = this.colorForDemoChip;
		this.categoryStruct.id = category.id;
		this.categoryStruct.textColor = category.textColor;
		this.categoryName = ''; // For disable submit button
		this.showSpinner = true;
	}

	prepareSubmit() {
		this.categoryStruct.name = this.categoryName;
		this.categoryStruct.color = this.colorForDemoChip;
		this.categoryStruct.textColor = '#FFFFFF';
		this.categoryName = ''; // For disable submit button
		this.showSpinner = true;
	}

	reloadColors() {
		this.colorForCategory = [];
		this.generateRandomColors();
	}

	selectedBackground(color: string) {
		this.colorForDemoChip = color;
	}

	getComponentMode() {
		this.activatedRoute.params.subscribe((params) => {
			this.editMode = params['mode'] === 'new' ? false : true;
		});
		if (this.editMode) {
			this.setupForEditMode();
		}
	}

	/*selectedTextColor(color: string) {
		this.colorTextDemoChip = color;
	}*/

	/*reloadTextColors() {
		this.colorText = [];
		this.generateTextColors();
	}*/

	/*generateTextColors() {
		for (let i = 0; i <= 10; i++) {
			let color = '#000000'.replace(/0/g, function() {
				return (~~(Math.random() * 16)).toString(16);
			});
			this.colorText.push(color);
		}
		this.colorTextDemoChip = this.colorText[0];
	}*/
}
