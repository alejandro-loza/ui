import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';
import { ExpensesComponent } from    './component/expenses.component';
import { ExpensesRoutes } from       './expenses.routes';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    ExpensesRoutes
  ]
})
export class ExpensesModule { }
