import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonModule } from '@components/back-button/back-button.module';

// Component
import { CategoryDetailsComponent } from './components/category-details.component';

// Route
import { CATEGORY_DETAILS_ROUTER } from './category-details.routes';

@NgModule({
	imports: [ CommonModule, BackButtonModule, CATEGORY_DETAILS_ROUTER ],
	declarations: [ CategoryDetailsComponent ]
})
export class CategoryDetailsModule {}
