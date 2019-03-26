import { NgModule } from '@angular/core';
import { ModalCategoriesComponent } from './component/modal-categories.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriesListModule } from '@pages/categories/categories-list/categories-list.module';

@NgModule({
  declarations: [
    ModalCategoriesComponent
  ],
  imports: [
    SharedModule,
    CategoriesListModule
  ],
  exports: [
    ModalCategoriesComponent
  ]
})
export class ModalCategoriesModule { }
