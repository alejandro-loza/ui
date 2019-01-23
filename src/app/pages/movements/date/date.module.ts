import { NgModule } from '@angular/core';
import { DateComponent } from './component/date.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DateComponent
  ]
})
export class DateModule { }
