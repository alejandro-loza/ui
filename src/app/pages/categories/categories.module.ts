import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './component/categories.component';
import { CategoriesRoutes } from './categories.routes';
import { CategoriesListModule } from './categories-list/categories-list.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	imports: [ CommonModule, CategoriesRoutes, CategoriesListModule, SharedModule ],
	declarations: [ CategoriesComponent ]
})
export class CategoriesModule {}
