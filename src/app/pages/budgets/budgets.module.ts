import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { BUDGETS_ROUTES } from './budgets.route';

// Components
import { BudgetsComponent } from './components/budgets.component';

@NgModule({
  imports: [
    CommonModule,
    BUDGETS_ROUTES
  ],
  declarations: [ BudgetsComponent ]
})
export class BudgetsModule { }
