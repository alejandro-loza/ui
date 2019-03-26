import { NgModule } from '@angular/core';

import { DiagnosticComponent } from './component/diagnostic.component';

import { DiagnosticRoutes } from './diagnostic.routes';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DiagnosticComponent],
  imports: [SharedModule],
  exports: [DiagnosticComponent]
})
export class DiagnosticModule {}
