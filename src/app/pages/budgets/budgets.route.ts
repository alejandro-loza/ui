import { RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from './components/budgets.component';

const BUDGETS_ROUTING: Routes = [
	{ path: '', component: BudgetsComponent },
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
