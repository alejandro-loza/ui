import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './../guards/auth/auth.guard'

const PAGES_ROUTING: Routes = [
	{
		path:'',
		component: PagesComponent,
		canActivate: [ AuthGuard ],
		canActivateChild: [ AuthGuard ],
		children: [
			{path: 'dashboard', component: DashboardComponent},
			{path: '', pathMatch:'full', redirectTo: '/dashboard'},
			{path: '**', redirectTo: '/dashboard'}
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(PAGES_ROUTING);