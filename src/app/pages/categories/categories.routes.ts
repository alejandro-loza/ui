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
		path: 'details',
		loadChildren: './category-details/category-details.module#CategoryDetailsModule',
		data: {
			title: 'Detalles de la categoría'
		}
	},
	{
		path: 'subcategory-workshop/:mode',
		loadChildren: './subcategory-workshop/subcategory-workshop.module#SubcategoryWorkshopModule',
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
