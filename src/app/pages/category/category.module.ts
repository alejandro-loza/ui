import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Route
import { CATEGORY_ROUTES } from './category.route';

// Component
import { CategoryComponent } from './components/category.component';

@NgModule({
  imports: [
    CommonModule,
    CATEGORY_ROUTES
  ],
  declarations: [ CategoryComponent ]
})
export class CategoryModule { }
