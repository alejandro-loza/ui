import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoryMovementComponent } from './component/category-movement.component';

@NgModule({
  declarations: [
    CategoryMovementComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CategoryMovementComponent
  ]
})
export class CategoryMovementModule { }
