import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryItemModule } from '../category-item/category-item.module';
import { CategoriesListComponent } from './component/categories-list.component';

@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    SharedModule,
    CategoryItemModule
  ],
  exports: [
    CategoriesListComponent
  ]
})
export class CategoriesListModule { }
