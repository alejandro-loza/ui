import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';

import { DiagnosticComponent } from  './component/diagnostic.component';

import { DiagnosticRoutes } from     './diagnostic.routes';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [DiagnosticComponent],
  imports: [
    CommonModule,
    NgxChartsModule,
    // DiagnosticRoutesE
  ],
  exports: [
    DiagnosticComponent
  ]
})
export class DiagnosticModule { }
