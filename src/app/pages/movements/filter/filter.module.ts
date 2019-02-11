import { NgModule } from '@angular/core';
import { FilterComponent } from './component/filter.component';
import { ParamsMovementsService } from '@services/movements/params-movements/params-movements.service';
import { SharedModule } from '../../../shared/shared.module';
import { DateModule } from '../date/date.module';
import { DateApiService } from '@services/date-api/date-api.service';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    SharedModule,
    DateModule
  ],
  providers: [
    ParamsMovementsService,
    DateApiService
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
