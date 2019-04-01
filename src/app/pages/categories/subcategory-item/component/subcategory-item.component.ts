import { Component, OnInit, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { Category } from '@interfaces/category.interface';
import { CategoriesService } from '@services/categories/categories.service';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';

@Component({
	selector: 'app-subcategory-item',
	templateUrl: './subcategory-item.component.html',
	styleUrls: [ './subcategory-item.component.css' ]
})
export class SubcategoryItemComponent implements OnInit {
	@Input() category: Category;
	@Input() statusCategoryValue: boolean;
	@Output() statusCategory: EventEmitter<boolean>;
	constructor(
		private renderer: Renderer2,
		private categorieService: CategoriesService,
		private categoriesBeanService: CategoriesBeanService
	) {
		this.statusCategory = new EventEmitter();
	}

	ngOnInit() {
		this.findAllCategoriesFromJsonArray(this.category);
	}

	overSubcategory(i: number) {
		this.renderer.setStyle(
			document.getElementById(this.category.subCategories[i].id),
			'background-color',
			this.category.subCategories[i].color
		);
		this.renderer.setStyle(
			document.getElementById(this.category.subCategories[i].id),
			'color',
			this.category.subCategories[i].textColor
		);
	}

	outSubcategory(i: number) {
		this.renderer.removeStyle(document.getElementById(this.category.subCategories[i].id), 'background-color');
		this.renderer.removeStyle(document.getElementById(this.category.subCategories[i].id), 'color');
	}

	selectCategory(i: number) {
		const auxcategory = this.category.subCategories[i];
		this.categoriesBeanService.setCategory = auxcategory;
		this.statusCategoryValue = true;
		this.statusCategory.emit(this.statusCategoryValue);
	}

	trackByFn(index: number, category: Category) {
		return category.id;
	}

	orderCategoriesByColor(category: Category) {
		category.subCategories.sort((currentCategory, nextCategory) => {
			if (currentCategory.color > nextCategory.color) {
				return 1;
			} else if (currentCategory.color < nextCategory.color) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	private findAllCategoriesFromJsonArray(category: Category) {
		this.orderCategoriesByColor(category);
		for (let i = 0; i < category.subCategories.length; i++) {
			const subcategory = category.subCategories[i];
			subcategory.parent = {
				id: category.id
			};
		}
	}
}
