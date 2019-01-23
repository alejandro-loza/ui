import { NgModule } from                     '@angular/core';
import { SharedModule } from                 '@shared/shared.module';

import { DateApiService } from               '@services/date-api/date-api.service';

import { CategoryModule } from               '@pages/categories/category/category.module';
import { MovementDetailModule } from         '../movement-detail/movement-detail.module';

import { DateModule } from                   '../date/date.module';

import { MovementComponent } from            './component/movement.component';

@NgModule({
  declarations: [
    MovementComponent,
  ],
  imports: [
    SharedModule,
    DateModule,
    CategoryModule,
    MovementDetailModule
  ], exports: [
    MovementComponent
  ], providers: [
    DateApiService
  ]
})
export class MovementModule { }
