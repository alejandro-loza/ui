import { Routes, RouterModule } from '@angular/router';

import { MobileComponent } from './component/mobile.component';

const MobileRouting: Routes = [
  { path: '', component: MobileComponent }
];

export const MobileRoutes = RouterModule.forChild( MobileRouting );
