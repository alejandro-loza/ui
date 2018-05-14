import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category.component';

const CATEGORY_ROUTING: Routes = [
    { path: '', component: CategoryComponent }
];

export const CATEGORY_ROUTES = RouterModule.forChild( CATEGORY_ROUTING );