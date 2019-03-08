import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './components/budgets.component';

const BUDGETS_ROUTING: Routes = [
	{
		path: '',
		component: BudgetsComponent
	},
	{
		path: 'new-budget',
		loadChildren: './new-budget/new-budget.module#NewBudgetModule',
		data: {
			title: 'Nuevo Presupuesto'
		}
	},
	{
		path: 'shared-budget/:action',
		loadChildren: './shared-budget-component/shared-budget-component.module#SharedBudgetComponentModule',
		data: {
			title: 'Edita tu Presupuesto'
		}
	},
	{
		path: ':name',
		loadChildren: './budget-detail/budget-detail.module#BudgetDetailModule',
		data: {
			title: 'Detalles del Presupuesto'
		}
	},
	{
		path: '**',
		redirectTo: '/access/login'
	}
];

export const BUDGETS_ROUTES = RouterModule.forChild(BUDGETS_ROUTING);
