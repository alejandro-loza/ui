import { RouterModule, Routes } from '@angular/router';
import { CategoryWorkshopComponent } from './components/category-workshop.component';

const CATEGORY_WORKSHOP_ROUTING: Routes = [ { path: '', component: CategoryWorkshopComponent } ];

export const CATEGORY_WORKSHOP_ROUTER = RouterModule.forChild(CATEGORY_WORKSHOP_ROUTING);
