import { NgModule } from '@angular/core';

import { DiagnosticComponent } from './component/diagnostic.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DiagnosticComponent],
  imports: [SharedModule],
  exports: [DiagnosticComponent]
})
export class DiagnosticModule {}
