import { Injectable } from '@angular/core';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from '@services/config/config.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { map } from 'rxjs/operators';
import { WorkshopCategory } from '@app/interfaces/categories/workshopCategory.interface';
import { CategoryId } from '@app/interfaces/categories/categoryId.interface';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {
	private category: Category;
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
				headers: this.configService.getHeaders
			})
			.pipe(
				map((res) => {
					this.categoriesBeanService.setCategories(res.body);
					return res;
				})
			);
	}

	getPreliminarCategory(description: string, income: boolean): Observable<HttpResponse<CategoryId>> {
		const URL = `${environment.apiUrl}//apiv2/categories/search`;
		let body: any = { text: description, income: income };
		return this.http.post<CategoryId>(URL, body, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}

	createCategoryOrSubcategory(struct: WorkshopCategory): Observable<HttpResponse<Category>> {
		const URL = `${environment.backendUrl}/users/${this.configService.getUser.id}/categories`;
		return this.http.post<Category>(URL, struct, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}

	updateCategoryOrSubcategory(category: WorkshopCategory): Observable<HttpResponse<Category>> {
		const URL = `${environment.backendUrl}/categories/${category.id}`;
		return this.http.put<Category>(URL, category, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}

	deleteCategoryOrSubcategory(category: Category): Observable<HttpResponse<Category>> {
		const URL = `${environment.backendUrl}/categories/${category.id}`;
		return this.http.delete<Category>(URL, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}
}
