import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

// Component
import { CategoryWorkshopComponent } from './components/category-workshop.component';

// Route
import { CATEGORY_WORKSHOP_ROUTER } from './category-workshop.route';

@NgModule({
	imports: [ CommonModule, BackButtonModule, FormsModule, SharedModule, CATEGORY_WORKSHOP_ROUTER ],
	declarations: [ CategoryWorkshopComponent ]
})
export class CategoryWorkshopModule {}
