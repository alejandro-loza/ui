import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { CategoriesComponent } from        './component/categories.component';
import { CategoriesRoutes } from           './categories.routes';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutes
  ],
  declarations: [
    CategoriesComponent,
  ],
})
export class CategoriesModule { }
