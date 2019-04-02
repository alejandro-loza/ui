import { Category } from '../category.interface';

export interface WorkshopCategory {
	color?: String;
	textColor?: String;
	name?: String;
	id?: String;
	user?: {
		id: String;
	};
	parent?: Category;
}
