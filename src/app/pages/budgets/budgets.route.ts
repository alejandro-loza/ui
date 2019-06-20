import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './components/budgets.component';

const BUDGETS_ROUTING: Routes = [
	{
		path: '',
		component: BudgetsComponent
	},
	{
		path: 'new-budget',
		loadChildren: () => import('./new-budget/new-budget.module').then(module => module.NewBudgetModule),
		data: {
			title: 'Nuevo Presupuesto'
		}
	},
	{
		path: 'shared-budget/:action',
		loadChildren: () => import('./shared-budget-component/shared-budget-component.module').then(module => module.SharedBudgetComponentModule),
		data: {
			title: 'Edita tu Presupuesto'
		}
	},
	{
		path: ':name',
		loadChildren: () => import('./budget-detail/budget-detail.module').then(module=> module.BudgetDetailModule),
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
