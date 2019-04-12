import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

	constructor(
		private categoriesBeanService: CategoriesBeanService,
		private categoriesService: CategoriesService,
		private router: Router
	) {}

	ngOnInit() {
		this.getCategoriesFromAPI();
		this.windowPosition();
	}

	getCategoriesFromAPI() {
		this.categoriesService.getCategoriesInfo().subscribe((res) => {
			this.categoriesList = res.body;
			this.categoriesBeanService.setCategories(this.categoriesList);
			this.filterCategories();
		});
	}

	selectCategory(category: Category) {
		this.categoriesBeanService.setCategoryToViewDetails(category);
		this.router.navigateByUrl('/app/categories/details');
	}

	filterCategories() {
		this.categoriesList.forEach((category) => {
			if (isNullOrUndefined(category.userId)) {
				this.systemCategories.push(category);
			} else {
				this.userCategories.push(category);
			}
		});
	}

	windowPosition() {
		window.scrollTo(0, 0);
		let html = document.querySelector('html');
		html.style.overflowX = 'hidden';
	}
}
