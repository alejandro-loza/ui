import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { BalanceComponent } from './component/balance.component';
import { BalanceRoutes } from    './balance.routes';


@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    BalanceRoutes
  ],
  exports: [ BalanceComponent ]
})
export class BalanceModule { }
