import { RouterModule, Routes } from '@angular/router';
import { CredentialDetailsComponent } from './components/credential-details.component';

const CREDENTIAL_DETAILS_ROUTING: Routes = [
    { path:'', component:CredentialDetailsComponent }
];

export const CREDENTIAL_DETAILS_ROUTES = RouterModule.forChild( CREDENTIAL_DETAILS_ROUTING );