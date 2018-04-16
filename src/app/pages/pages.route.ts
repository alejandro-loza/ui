import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './../services/guards/auth/auth.guard'

const PAGES_ROUTING: Routes = [
	{
		path:'',
		component: PagesComponent,
    	canActivate: [ AuthGuard ],
		children: [
			{path: 'dashboard', component: DashboardComponent},
		]
	}
];

export const PAGES_ROUTES = RouterModule.forChild(PAGES_ROUTING);
