import { NgModule } from             '@angular/core';
import { CategoryComponent } from    './component/category.component';
import { SharedModule } from         '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CategoryComponent
  ],
  exports: [
    CategoryComponent
  ]
})
export class CategoryModule {}
