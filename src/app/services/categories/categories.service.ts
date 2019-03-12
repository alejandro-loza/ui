import { Injectable } from '@angular/core';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from '@services/config/config.service';
import { environment } from '@env/environment';
import { Observable, from } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { map } from 'rxjs/operators';
import { Response } from '@app/interfaces/response.interface';
import { WorkshopCategory } from '@app/interfaces/categories/workshopCategory.interface';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	category: Category;
	categories: Category[];
	constructor(
		private http: HttpClient,
		private configService: ConfigService,
		private categoriesBeanService: CategoriesBeanService
	) {}

	getCategoriesInfo(): Observable<HttpResponse<Category[]>> {
		const URL = `${environment.apiUrl}/apiv2/categories`;
		return this.http
			.get<Category[]>(URL, {
				observe: 'response',
				headers: this.configService.getJsonHeaders()
			})
			.pipe(
				map((res) => {
					this.categories = res.body;
					this.categoriesBeanService.setCategories(this.categories);
					return res;
				})
			);
	}

	public set setCategory(category: Category) {
		this.category = category;
	}

	public get getCategory(): Category {
		return this.category;
	}

	createCategoryOrSubcategory(category: WorkshopCategory): Observable<HttpResponse<Category>> {
		const URL = `${environment.backendUrl}/users/${sessionStorage.getItem('id-user')}/categories`;
		return this.http.post<Category>(URL, category, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}

	deleteCategory(categoryId: string): Observable<HttpResponse<Category>> {
		const URL = `${environment.backendUrl}/categories/${categoryId}`;
		return this.http.delete<Category>(URL, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}
}
