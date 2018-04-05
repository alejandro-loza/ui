import { RouterModule, Routes } from '@angular/router';
import { OfflineComponent } from './components/offline.component';

const OFFLINE_ROUTING: Routes = [
    { path: '', component: OfflineComponent }
];

export const OFFLINE_ROUTES = RouterModule.forChild( OFFLINE_ROUTING );