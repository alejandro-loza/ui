import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from './components/credential.component';

const CREDENTIAL_ROUTING: Routes = [
    { path:'', component:CredentialComponent }
];

export const CREDENTIAL_ROUTES = RouterModule.forChild( CREDENTIAL_ROUTING );