import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './components/category-details.component';

const CATEGORY_DETAILS_ROUTING: Routes = [ { path: '', component: CategoryDetailsComponent } ];

export const CATEGORY_DETAILS_ROUTER = RouterModule.forChild(CATEGORY_DETAILS_ROUTING);
