import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ConfigService } from '@services/config/config.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Response } from '@interfaces/response.interface';
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
    private configService: ConfigService
  ) {}

  getCategoriesInfo(): Observable<HttpResponse<Response<Category>>> {
    const URL = `${environment.backendUrl}/categories?deep=true`;
    return this.http.get<Response<Category>>(URL, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    }).pipe(
      map( res => {
        this.categories = res.body.data;
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
