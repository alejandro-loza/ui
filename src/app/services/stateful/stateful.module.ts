import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    StatefulMovementsService
  ],
  exports: [ ]
})
export class StatefulModule { }
