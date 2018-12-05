import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { CategoriesComponent } from        './component/categories.component';
import { CategoriesRoutes } from           './categories.routes';
import { CategoryComponent } from './component/category/category.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutes
  ],
  declarations: [CategoriesComponent, CategoryComponent]
})
export class CategoriesModule { }
