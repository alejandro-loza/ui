import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { CategoriesComponent } from        './component/categories.component';
import { CategoriesRoutes } from           './categories.routes';
import { CategoryModule } from             './component/category/category.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryModule,
    CategoriesRoutes
  ],
  declarations: [
    CategoriesComponent,
  ],
})
export class CategoriesModule { }
