import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './component/categories-list.component';
import { CategoryItemModule } from '../category-item/category-item.module';

@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    CategoryItemModule
  ],
  exports: [
    CategoriesListComponent
  ]
})
export class CategoriesListModule { }
