import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryMovementComponent } from './component/category-movement.component';
import { ModalCategoriesModule } from '@components/modal-categories/modal-categories.module';

@NgModule({
  imports: [
    SharedModule,
    ModalCategoriesModule
  ],
  declarations: [
    CategoryMovementComponent,
  ],
  exports: [
    CategoryMovementComponent
  ]
})
export class CategoryMovementModule { }
