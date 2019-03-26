import { NgModule } from '@angular/core';
import { DateComponent } from './component/date.component';
import { SharedModule } from '@shared/shared.module';
import { DateApiService } from '@services/date-api/date-api.service';

@NgModule({
  declarations: [
    DateComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DateComponent
  ],
  providers: [
    DateApiService
  ]
})
export class DateModule { }

