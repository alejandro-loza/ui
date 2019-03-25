import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@services/categories/categories.service';
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
	colorText: String[] = [];

	// Variables to API
	colorForDemoChip: String = '';
	colorTextDemoChip: String = '';
	categoryName: String = '';

	categoryStruct: WorkshopCategory = {
		color: '',
		name: '',
		textColor: ''
	};

	constructor(
		private activatedRoute: ActivatedRoute,
		private categoriesService: CategoriesService,
		private router: Router,
		private toastService: ToastService,
		private categoriesBeanService: CategoriesBeanService
	) {}

	ngOnInit() {
		this.getComponentMode();
		this.generateRandomColors();
		this.generateTextColors();
	}

	submitCategory() {
		this.categoryStruct.name = this.categoryName;
		this.categoryStruct.color = this.colorForDemoChip;
		this.categoryStruct.textColor = this.colorTextDemoChip;

		this.categoriesService.createCategoryOrSubcategory(this.categoryStruct).subscribe((res) => {
			this.toastService.setCode = res.status;
		}),
			(error) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Algo salió mal, inténtalo más tarde';
				this.toastService.toastGeneral();
				return this.router.navigateByUrl('/app/categories');
			},
			() => {
				this.toastService.setMessage = '¡Categoría creada con éxito!';
				this.toastService.toastGeneral();
				this.categoriesBeanService.setCategories([]);
				return this.router.navigateByUrl('/app/categories');
			};
	}

	getComponentMode() {
		this.activatedRoute.params.subscribe((params) => {
			this.editMode = params['mode'] === 'new' ? false : true;
		});
	}

	generateRandomColors() {
		for (let i = 0; i <= 10; i++) {
			let color = '#000000'.replace(/0/g, function() {
				return (~~(Math.random() * 16)).toString(16);
			});
			this.colorForCategory.push(color);
		}
		this.colorForDemoChip = this.colorForCategory[0];
	}

	generateTextColors() {
		for (let i = 0; i <= 10; i++) {
			let color = '#000000'.replace(/0/g, function() {
				return (~~(Math.random() * 16)).toString(16);
			});
			this.colorText.push(color);
		}
		this.colorTextDemoChip = this.colorText[0];
	}

	reloadColors() {
		this.colorForCategory = [];
		this.generateRandomColors();
	}

	reloadTextColors() {
		this.colorText = [];
		this.generateTextColors();
	}

	selectedBackground(color: string) {
		this.colorForDemoChip = color;
	}

	selectedTextColor(color: string) {
		this.colorTextDemoChip = color;
	}
}
