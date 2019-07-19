import { Injectable } from '@angular/core';
import { Category } from '@app/interfaces/category.interface';
import { isNullOrUndefined } from 'util';

@Injectable({
	providedIn: 'root'
})
export class CategoriesHelperService {
	conceptAcordingOfCategory: string;
	constructor() {}

	set setConceptAcordingOfCategory(data: string) {
		this.conceptAcordingOfCategory = data;
	}

	get getConceptAcordingOfCategory(): string {
		return this.conceptAcordingOfCategory;
	}

	categoryByIds(parentCategory: string, subcatCategory: string, categories: Category[]): Category {
		let response: Category;
		categories.forEach((category) => {
			if (category.id == parentCategory) {
				category.subCategories.forEach((subcat) => {
					if (subcat.id == subcatCategory) {
						response = subcat;
					}
				});
			}
		});
		return response;
	}

	getParentCategoryId(subcategoryId: string, categories: Category[]): string {
		let parentId: string = '';
		categories.forEach((category) => {
			if (!isNullOrUndefined(category.subCategories)) {
				category.subCategories.forEach((subcat) => {
					if (subcat.id == subcategoryId) {
						parentId = category.id;
					}
				});
			} else {
				if (category.id == subcategoryId) {
					parentId = category.id;
				}
			}
		});
		return parentId;
	}

	getCategoryById(categoryId: String, categories: Category[]): Category {
		let categoryToReturn: Category;
		categories.forEach((category) => {
			if (category.subCategories.length > 0) {
				category.subCategories.forEach((subcategory) => {
					if (categoryId == subcategory.id) {
						categoryToReturn = subcategory;
					}
				});
			}
			if (category.id == categoryId) {
				categoryToReturn = category;
			}
		});
		return categoryToReturn;
	}

	categoryForManualAccountMovement(nature: String, outcome: boolean, categories: Category[]): Category {
		let category: Category;
		if (nature == 'ma_cash') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Egreso de efectivo';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Ingreso de efectivo';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000050',
					'00000000-0000-0000-0000-000000000056',
					categories
				);
			}
		} else if (nature == 'ma_debitCard') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Egreso de tarjeta de débito';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Ingreso de tarjeta de débito';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000050',
					'00000000-0000-0000-0000-000000000056',
					categories
				);
			}
		} else if (nature == 'ma_creditCard') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Gasto en tarjeta de crédito';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Pago a tarjeta de crédito';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-000000000048',
					categories
				);
			}
		} else if (nature == 'ma_investment') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Egreso de inversión';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Rendimientos';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000050',
					'00000000-0000-0000-0000-000000000055',
					categories
				);
			}
		} else if (nature == 'ma_debt') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Incremento de deuda';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Pago de deuda';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			}
		} else if (nature == 'ma_personalCredit') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Incremento de crédito personal';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Pago de crédito personal';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			}
		} else if (nature == 'ma_mortgage') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Incremento de hipoteca';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Pago hipoteca';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-00000000000b',
					'00000000-0000-0000-0000-000000000031',
					categories
				);
			}
		} else if (nature == 'ma_lifeInsurance') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Egreso de seguro de vida';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Rendimientos';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000050',
					'00000000-0000-0000-0000-000000000055',
					categories
				);
			}
		} else if (nature == 'ma_goods') {
			if (outcome) {
				this.setConceptAcordingOfCategory = 'Depreciación de bienes';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000047',
					'00000000-0000-0000-0000-00000000004f',
					categories
				);
			} else {
				this.setConceptAcordingOfCategory = 'Rendimientos';
				category = this.categoryByIds(
					'00000000-0000-0000-0000-000000000050',
					'00000000-0000-0000-0000-000000000055',
					categories
				);
			}
		}
		return category;
	}
}
