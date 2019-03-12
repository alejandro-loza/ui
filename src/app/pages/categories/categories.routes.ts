import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/categories.component';

const CategoriesRouting: Routes = [
	{
		path: '',
		component: CategoriesComponent
	},
	{
		path: 'workshop/:mode',
		loadChildren: './category-workshop/category-workshop.module#CategoryWorkshopModule',
		data: {
			title: 'Personaliza tu categoría'
		}
	},
	{
		path: '**',
		redirectTo: '/access/login'
	}
];

export const CategoriesRoutes = RouterModule.forChild(CategoriesRouting);
