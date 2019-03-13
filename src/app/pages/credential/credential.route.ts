import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from './components/credential.component';

const CREDENTIAL_ROUTING: Routes = [
	{
		path: '',
		component: CredentialComponent
	},
	{
		path: ':credencialId',
		loadChildren: './credential-details/credential-details.module#CredentialDetailsModule',
		data: {
			title: 'Detalle de la cuenta bancaria'
		}
	},
	{
		path: '**',
		redirectTo: '/access/login'
	}
];

export const CREDENTIAL_ROUTES = RouterModule.forChild(CREDENTIAL_ROUTING);
