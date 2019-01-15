import { NgModule } from '@angular/core';
import { FilterComponent } from './component/filter.component';
import { ParamsService } from '@services/movements/params/params.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    ParamsService
  ],
  exports: [
    FilterComponent
  ]
})
export class FilterModule { }
