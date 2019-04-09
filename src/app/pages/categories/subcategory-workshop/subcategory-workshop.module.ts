import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

// Component
import { SubcategoryWorkshopComponent } from './components/subcategory-workshop.component';

// Route
import { SUBCATEGORY_WORKSHOP_ROUTER } from './subcategory-workshop.route';

@NgModule({
	imports: [ CommonModule, FormsModule, SharedModule, BackButtonModule, SUBCATEGORY_WORKSHOP_ROUTER ],
	declarations: [ SubcategoryWorkshopComponent ]
})
export class SubcategoryWorkshopModule {}
