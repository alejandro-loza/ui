import { NgModule } from                     '@angular/core';
import { SharedModule } from                 '@shared/shared.module';

import { DateApiService } from               '@services/date-api/date-api.service';

import { CategoryModule } from               '@pages/categories/category/category.module';
import { MovementDetailModule } from         '../movement-detail/movement-detail.module';

import { AmountModule } from                 './amount/amount.module';
import { ConsiderModule } from               './consider/consider.module';
import { DateModule } from                   './date/date.module';
import { DescriptionModule } from            './description/description.module';
import { ImageModule } from                  './image/image.module';

import { MovementComponent } from            './component/movement.component';

@NgModule({
  declarations: [
    MovementComponent,
  ],
  imports: [
    SharedModule,
    AmountModule,
    ConsiderModule,
    DateModule,
    DescriptionModule,
    ImageModule,
    CategoryModule,
    MovementDetailModule
  ], exports: [
    MovementComponent
  ], providers: [
    DateApiService
  ]
})
export class MovementModule { }
