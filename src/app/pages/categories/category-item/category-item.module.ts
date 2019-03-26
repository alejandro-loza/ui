import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './component/category-item.component';

@NgModule({
  declarations: [
    CategoryItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoryItemComponent
  ]
})
export class CategoryItemModule { }
