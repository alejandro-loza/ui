import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListComponent } from './component/item-list.component';
import { ItemModule } from       '../item/item.module';
import { ItemDetailModule } from '../item-detail/item-detail.module';

@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    CommonModule,
    ItemModule,
    ItemDetailModule,
  ],
  exports: [
    ItemListComponent
  ],
  providers: [

  ]
})
export class ItemListModule { }
