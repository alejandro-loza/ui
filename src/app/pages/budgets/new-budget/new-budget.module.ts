import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { CategoriesListModule } from '@pages/categories/categories-list/categories-list.module';

// Component
import { NewBudgetComponent } from './components/new-budget.component';

// Route
import { NEW_BUDGET_ROUTES } from './new-budget.route';

@NgModule({
	imports: [ CommonModule, BackButtonModule, SharedModule, FormsModule, CategoriesListModule, NEW_BUDGET_ROUTES ],
	declarations: [ NewBudgetComponent ]
})
export class NewBudgetModule {}
