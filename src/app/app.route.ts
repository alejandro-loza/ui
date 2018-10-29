import { RouterModule, Routes  } from '@angular/router';
import { AuthGuard } from './services/guards/auth/auth.guard';

const AppRouting: Routes = [
    {
        path: 'access',
        loadChildren: './access/access.module#AccessModule'
    },
    {
        path: 'app',
        canActivate: [ AuthGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/access/login'
    },
    {
        path: '**',
        redirectTo: '/access/login'
    }
];

export const AppRoutes = RouterModule.forRoot(AppRouting);
