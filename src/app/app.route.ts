import { RouterModule, Routes, PreloadAllModules  } from '@angular/router';

import { AccessComponent } from './access/access.component';
import { PagesComponent } from './pages/pages.component';


import { AuthGuard } from './services/guards/auth/auth.guard';

const APP_ROUTING: Routes = [
    {
        path: 'access',
        component: AccessComponent,
        loadChildren: './access/access.module#AccessModule'
    },
    {
        path: 'app',
        component: PagesComponent,
      //  canActivate: [ AuthGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '', pathMatch:'full', redirectTo:'/access/login'},
    { path: '**', redirectTo:'/access/login'}
];

export const APP_ROUTES = RouterModule.forRoot(APP_ROUTING);
