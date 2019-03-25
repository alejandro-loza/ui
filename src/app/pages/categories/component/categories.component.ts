import { Component, OnInit } from '@angular/core';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { CategoriesService } from '@services/categories/categories.service';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: [ './categories.component.css' ]
})
export class CategoriesComponent implements OnInit {
	categoriesList: Category[] = [];
	systemCategories: Category[] = [];
	userCategories: Category[] = [];

	constructor(private categoriesBeanService: CategoriesBeanService, private categoriesService: CategoriesService) {}

	ngOnInit() {
		this.fillCategories();
	}

	fillCategories() {
		if (this.categoriesBeanService.getCategories().length == 0) {
			this.getCategoriesFromAPI();
		} else {
			this.categoriesList = this.categoriesBeanService.getCategories();
			this.filterCategories();
		}
	}

	getCategoriesFromAPI() {
		this.categoriesService.getCategoriesInfo().subscribe((res) => {
			this.categoriesList = res.body;
			this.categoriesBeanService.setCategories(this.categoriesList);
			this.filterCategories();
		});
	}

	selectCategory(category: Category) {}

	filterCategories() {
		this.categoriesList.forEach((category) => {
			if (isNullOrUndefined(category.user)) {
				this.systemCategories.push(category);
			} else {
				this.userCategories.push(category);
			}
		});
	}
}
