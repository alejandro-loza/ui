import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './component/categories.component';

const CategoriesRouting: Routes = [
	{
		path: '',
		component: CategoriesComponent
	},
	{
		path: 'workshop/:mode',
		loadChildren: () => import('./category-workshop/category-workshop.module').then(module => module.CategoryWorkshopModule),
		data: {
			title: 'Personaliza tu categoría'
		}
	},
	{
		path: 'details',
		loadChildren: () => import('./category-details/category-details.module').then(module => module.CategoryDetailsModule),
		data: {
			title: 'Detalles de la categoría'
		}
	},
	{
		path: 'subcategory-workshop/:mode',
		loadChildren: () => import('./subcategory-workshop/subcategory-workshop.module').then(module => module.SubcategoryWorkshopModule),
		data: {
			title: 'Personaliza tu subcategoría'
		}
	},
	{
		path: '**',
		redirectTo: '/access/login'
	}
];

export const CategoriesRoutes = RouterModule.forChild(CategoriesRouting);
