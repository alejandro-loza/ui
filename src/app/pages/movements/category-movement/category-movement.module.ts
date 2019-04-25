import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryMovementComponent } from './component/category-movement.component';
import {ModalCategoriesComponent} from '@components/modal-categories/component/modal-categories.component';
import {ModalCategoriesModule} from '@components/modal-categories/modal-categories.module';

@NgModule({
  declarations: [
    CategoryMovementComponent
  ],
  imports: [
    ModalCategoriesModule,
    SharedModule
  ],
  exports: [
    CategoryMovementComponent
  ],
  providers: [],
  entryComponents: [ ModalCategoriesComponent ]
})
export class CategoryMovementModule { }
