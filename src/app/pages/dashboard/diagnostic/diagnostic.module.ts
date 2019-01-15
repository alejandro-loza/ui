import { NgModule } from             '@angular/core';

import { DiagnosticComponent } from  './component/diagnostic.component';

import { DiagnosticRoutes } from     './diagnostic.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DiagnosticComponent],
  imports: [
    SharedModule,
    NgxChartsModule,
    // DiagnosticRoutesE
  ],
  exports: [
    DiagnosticComponent
  ]
})
export class DiagnosticModule { }
