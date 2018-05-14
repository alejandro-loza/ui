import { RouterModule, Routes, Router } from '@angular/router';
import { PrivacyComponent } from './components/privacy.component';

const PRIVACY_ROUTING = [
    { path:'', component: PrivacyComponent }
];

export const PRIVACY_ROUTES = RouterModule.forChild( PRIVACY_ROUTING );