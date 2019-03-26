import { RouterModule, Routes } from '@angular/router';
import { IncomesComponent } from './component/incomes.component';

const IncomesRouting: Routes = [
  {
    path: '',
    component: IncomesComponent,
  }
];

export const IncomesRoutes = RouterModule.forChild( IncomesRouting );
