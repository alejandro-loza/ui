import { NgModule } from '@angular/core';

import {ModalTokenComponent} from './component/modal-token.component';

import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    ModalTokenComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ModalTokenComponent
  ]
})
export class ModalTokenModule { }
