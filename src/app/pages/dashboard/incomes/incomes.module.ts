import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { IncomesComponent } from './component/incomes.component';
import { IncomesRoutes } from    './incomes.routes';

@NgModule({
  declarations: [IncomesComponent],
  imports: [
    CommonModule,
    IncomesRoutes
  ],
  exports: [ IncomesComponent ]
})
export class IncomesModule { }
