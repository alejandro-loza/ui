import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/categories.component';

const CategoriesRouting: Routes = [
    {
      path: '',
      component: CategoriesComponent
    },
    {
      path: '**',
      redirectTo: '/access/login'
    }
];

export const CategoriesRoutes = RouterModule.forChild( CategoriesRouting );
