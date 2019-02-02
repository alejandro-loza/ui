import { NgModule } from '@angular/core';
import { ItemComponent } from './component/item.component';
import { SharedModule } from '@shared/shared.module';
import { DateModule } from '../date/date.module';
import { CategoryMovementModule } from '../category-movement/category-movement.module';
import { ItemDetailModule } from '../item-detail/item-detail.module';

@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    SharedModule,
    DateModule,
    CategoryMovementModule,
    ItemDetailModule,
   ],
  exports: [
    ItemComponent
  ],
  providers: [],
})
export class ItemModule {}
