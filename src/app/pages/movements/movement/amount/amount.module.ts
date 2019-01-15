import { NgModule } from '@angular/core';
import { AmountComponent } from './component/amount.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AmountComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AmountComponent
  ]
})
export class AmountModule { }
