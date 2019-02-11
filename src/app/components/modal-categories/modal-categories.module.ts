import { NgModule } from '@angular/core';
import { ModalCategoriesComponent } from './component/modal-categories.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ModalCategoriesComponent
  ],
  exports: [
    ModalCategoriesComponent
  ]
})
export class ModalCategoriesModule { }
