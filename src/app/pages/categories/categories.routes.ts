import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/categories.component';

const CategoriesRouting: Routes = [
    { path: '', component: CategoriesComponent }
];

export const CategoriesRoutes = RouterModule.forChild( CategoriesRouting );