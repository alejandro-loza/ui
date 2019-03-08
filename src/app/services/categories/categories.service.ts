import { Injectable } from '@angular/core';
import { CategoriesBeanService } from '@services/categories/categories-bean.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from '@services/config/config.service';
import { environment } from '@env/environment';
import { Observable, from } from 'rxjs';
import { Category } from '@interfaces/category.interface';
import { map } from 'rxjs/operators';

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
        map(res => {
          console.log(res.body);
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
}
