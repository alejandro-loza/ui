import { NgModule } from             '@angular/core';
import { CommonModule } from         '@angular/common';

import { DiagnosticComponent } from  './component/diagnostic.component';

import { DiagnosticRoutes } from     './diagnostic.routes';

@NgModule({
  declarations: [DiagnosticComponent],
  imports: [
    CommonModule,
    DiagnosticRoutes
  ],
  exports: [
    DiagnosticComponent
  ]
})
export class DiagnosticModule { }
