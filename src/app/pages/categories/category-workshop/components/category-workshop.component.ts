import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@services/categories/categories.service';
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
		private categoriesBeanService: CategoriesBeanService
	) {}

	ngOnInit() {
		this.getComponentMode();
		this.generateColors();
		this.generateTextColors();
	}

	submitCategory() {
		this.categoryStruct.name = this.categoryName;
		this.categoryStruct.color = this.colorForDemoChip;
		this.categoryStruct.textColor = this.colorTextDemoChip;

		this.categoriesService.createCategoryOrSubcategory(this.categoryStruct).subscribe((res) => {
			if (res.status == 200) {
				this.categoriesBeanService.setCategories([]);
				this.router.navigateByUrl('/app/categories');
			}
		});
	}

	selectedBackground(color: string) {
		this.colorForDemoChip = color;
	}

	selectedTextColor(color: string) {
		this.colorTextDemoChip = color;
	}

	getComponentMode() {
		this.activatedRoute.params.subscribe((params) => {
			this.editMode = params['mode'] === 'new' ? false : true;
		});
	}

	generateColors() {
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
		this.generateColors();
	}

	reloadTextColors() {
		this.colorText = [];
		this.generateTextColors();
	}
}
