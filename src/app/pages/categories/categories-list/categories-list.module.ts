import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryItemModule } from '../category-item/category-item.module';
import { CategoriesListComponent } from './component/categories-list.component';
import { SubcategoryItemModule } from '../subcategory-item/subcategory-item.module';

@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    SharedModule,
    CategoryItemModule,
    SubcategoryItemModule
  ],
  exports: [
    CategoriesListComponent
  ]
})
export class CategoriesListModule { }
