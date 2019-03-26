import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-category-details',
	templateUrl: './category-details.component.html',
	styleUrls: [ './category-details.component.css' ]
})
export class CategoryDetailsComponent implements OnInit {
	categoryToShow: Category;
	setHeightToCol: string = '';

	constructor(private categoriesBeanService: CategoriesBeanService, private router: Router) {}

	ngOnInit() {
		this.getCategoryToShow();
		this.settingDimensionOfCatContainer();
	}

	deleteUserCategory() {}

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
}
