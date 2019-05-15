import { Routes, RouterModule } from '@angular/router';
import { SuccessComponent } from './components/success.component';

const SUCCESS_ROUTING: Routes = [ { path: '', component: SuccessComponent } ];

export const SUCCESS_ROUTES = RouterModule.forChild(SUCCESS_ROUTING);
