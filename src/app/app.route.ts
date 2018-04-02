import { RouterModule, Routes, PreloadAllModules  } from '@angular/router';

import { AccessComponent } from './access/access.component';

const APP_ROUTING: Routes = [
    {
        path: 'access',
        component: AccessComponent,
        loadChildren: './access/access.module#AccessModule'
    },
    { path: '', pathMatch: 'full', redirectTo: '/access/login'},
    { path: '**', redirectTo:'/access/login'}
];

export const APP_ROUTES = RouterModule.forRoot(APP_ROUTING);
