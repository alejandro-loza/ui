import { RouterModule, Routes } from '@angular/router';
import { DiagnosticComponent } from './component/diagnostic.component';

const DiagnosticRouting: Routes = [
  {
    path: '',
    component: DiagnosticComponent,
  }
];

export const DiagnosticRoutes = RouterModule.forChild( DiagnosticRouting );
