import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptTypeMovementComponent } from './component/concept-type-movement.component';
import { CategoryMovementModule } from '../category-movement/category-movement.module';


@NgModule({
  imports: [
    CommonModule,
    CategoryMovementModule
  ],
  declarations: [
    ConceptTypeMovementComponent,
  ],
  exports: [
    ConceptTypeMovementComponent
  ]
})
export class ConceptTypeMovementModule { }
