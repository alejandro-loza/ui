import { RouterModule, Routes } from '@angular/router';
import { SubcategoryWorkshopComponent } from './components/subcategory-workshop.component';

const SUBCATEGORY_WORKSHOP_ROUTING: Routes = [ { path: '', component: SubcategoryWorkshopComponent } ];

export const SUBCATEGORY_WORKSHOP_ROUTER = RouterModule.forChild(SUBCATEGORY_WORKSHOP_ROUTING);
