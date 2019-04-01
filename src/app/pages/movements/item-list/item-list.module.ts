import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material';

import { ItemListComponent } from './component/item-list.component';

import { ItemModule } from       '../item/item.module';
import { ItemDetailModule } from '../item-detail/item-detail.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    SharedModule,
    ItemModule,
    ItemDetailModule,
    ScrollingModule,
    MatExpansionModule
  ],
  exports: [
    ItemListComponent
  ],
  providers: [

  ]
})
export class ItemListModule { }
