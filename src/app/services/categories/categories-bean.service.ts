import { Injectable } from '@angular/core';
import { Category } from '@app/interfaces/category.interface';

@Injectable({
	providedIn: 'root'
})
export class CategoriesBeanService {
	private category: Category;
	private categories: Category[] = [];
	private categoryToViewDetails: Category;
	private subcategoryToViewDetails: Category;

	constructor() {}

	public setCategoryToViewDetails(data: Category) {
		this.categoryToViewDetails = data;
	}

	public getCategoryToViewDetails(): Category {
		return this.categoryToViewDetails;
	}

	public setCategories(data: Category[]) {
		this.categories = data;
	}

	public getCategories(): Category[] {
		return this.categories;
	}

	public setSubcategoryToViewDetails(data: Category) {
		this.subcategoryToViewDetails = data;
	}

	public getSubcategoryToViewDetails(): Category {
		return this.subcategoryToViewDetails;
	}

	set setCategory(category: Category) {
		this.category = category;
	}

	get getCategory(): Category {
		return this.category;
	}
}
