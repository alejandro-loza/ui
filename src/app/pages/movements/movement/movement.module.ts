import { NgModule } from                     '@angular/core';
import { SharedModule } from                 '@shared/shared.module';

import { DateApiService } from               '@services/date-api/date-api.service';

import { MovementDetailModule } from         '../movement-detail/movement-detail.module';

import { DateModule } from                   '../date/date.module';

import { MovementComponent } from            './component/movement.component';
import { CategoryMovementModule } from '../category-movement/category-movement.module';

@NgModule({
  declarations: [
    MovementComponent,
  ],
  imports: [
    SharedModule,
    DateModule,
    CategoryMovementModule,
    MovementDetailModule
  ], exports: [
    MovementComponent
  ], providers: [
    DateApiService
  ]
})
export class MovementModule { }
