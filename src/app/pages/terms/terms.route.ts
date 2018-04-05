import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './components/terms.component';

const TERMS_ROUTING = [
    { path:'', component: TermsComponent }
];

export const TERMS_ROUTES = RouterModule.forChild( TERMS_ROUTING );