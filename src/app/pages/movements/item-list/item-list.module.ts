import { NgModule } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { ItemModule } from       '../item/item.module';
import { SharedModule } from '@shared/shared.module';

import { ItemListComponent } from './component/item-list.component';

@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    SharedModule,
    ItemModule,
    ScrollingModule
  ],
  exports: [
    ItemListComponent
  ],
  providers: [ ]
})
export class ItemListModule { }
