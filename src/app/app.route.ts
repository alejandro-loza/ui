import { RouterModule, Routes } from '@angular/router';

const APP_ROUTING: Routes = [
    {path: '**', redirectTo: '/access/login'}
];

export const APP_ROUTES = RouterModule.forRoot(APP_ROUTING);
