import { RouterModule, Routes } from '@angular/router';

const PAGES_ROUTING: Routes = [
		{path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
		{path: 'budgets', loadChildren: './budgets/budgets.module#BudgetsModule'},
		{path: 'movements', loadChildren: './movements/movements.module#MovementsModule' },
		{path: 'saving', loadChildren: './saving/saving.module#SavingModule' },
		{path: 'category', loadChildren: './category/category.module#CategoryModule' },
		{path: 'credential', loadChildren: './credential/credential.module#CredentialModule' },
		{path: 'terms', loadChildren: './terms/terms.module#TermsModule' },
		{path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule' },
		{path: '', pathMatch:'full', redirectTo: '/app/dashboard'},
		{path: '**', redirectTo: '/app/dashboard'}
];

export const PAGES_ROUTES = RouterModule.forChild( PAGES_ROUTING );
