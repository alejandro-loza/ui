import { NgModule } from '@angular/core';
import { ModalCategoriesComponent } from './component/modal-categories.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriesListModule } from '@pages/categories/categories-list/categories-list.module';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    ModalCategoriesComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    CategoriesListModule
  ],
  exports: [
    ModalCategoriesComponent
  ]
})
export class ModalCategoriesModule { }
