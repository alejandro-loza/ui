import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@services/categories/categories.service';
import { CleanerService } from '@services/cleaner/cleaner.service';
import { ToastService } from '@services/toast/toast.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { WorkshopCategory } from '@app/interfaces/categories/workshopCategory.interface';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';
import { Category } from '@app/interfaces/category.interface';

@Component({
	selector: 'app-category-workshop',
	templateUrl: './category-workshop.component.html',
	styleUrls: [ './category-workshop.component.css' ]
})
export class CategoryWorkshopComponent implements OnInit {
	isEditMode: boolean = false;
	urlCategories: string;
	colorForCategory: String[] = [];

	// Variables to API
	colorForDemoChip: String = '';
	categoryName: String = '';

	// AUX
	showSpinner: boolean = false;

	categoryStruct: WorkshopCategory;
	categoryToEdit: Category;

	constructor(
		private activatedRoute: ActivatedRoute,
		private categoriesService: CategoriesService,
		private router: Router,
		private toastService: ToastService,
		private categoriesBeanService: CategoriesBeanService,
		private cleanerService: CleanerService,
		private mixpanelService: MixpanelService
	) {
		this.urlCategories = '/app/categories';
		this.categoryToEdit = {};
		this.categoryStruct = {
			color: '',
			textColor: '',
			name: '',
			id: '',
			user: {
				id: ''
			},
			parent: {}
		};
	}

	ngOnInit() {
		this.getComponentMode();
		this.generateRandomColors();
	}

	setupForEditMode() {
		this.categoryToEdit = this.categoriesBeanService.getCategoryToViewDetails();
		this.categoryName = this.categoryToEdit.name;
		this.colorForDemoChip = this.categoryToEdit.color;
		this.colorForCategory.push(this.colorForDemoChip);
	}

	submitCategory() {
		this.cleanerService.cleanAllVariables();
		this.isEditMode ? this.updateCategory() : this.createCategory();
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
			this.mixpanelEvent('Create category');
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
		this.categoryStruct.name = this.categoryName;
		this.categoryStruct.color = this.colorForDemoChip;
		this.categoryStruct.id = this.categoryToEdit.id;
		this.categoryStruct.textColor = this.categoryToEdit.textColor;
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
			this.isEditMode = params['mode'] === 'new' ? false : true;
		});
		if (this.isEditMode) {
			this.setupForEditMode();
		}
	}

	mixpanelEvent(track: string) {
		this.mixpanelService.setIdentify();
		this.mixpanelService.setTrackEvent(track);
	}
}
