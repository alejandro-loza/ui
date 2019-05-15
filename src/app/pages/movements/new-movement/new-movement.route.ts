import { RouterModule, Routes } from '@angular/router';
import { NewMovementComponent } from './component/new-movement.component';

const NEW_MOVEMENT_ROUTING: Routes = [
	{
		path: '',
		component: NewMovementComponent
	}
];

export const NEW_MOVEMENT_ROUTER = RouterModule.forChild(NEW_MOVEMENT_ROUTING);
