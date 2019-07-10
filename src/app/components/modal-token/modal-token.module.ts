import { NgModule } from '@angular/core';

import {ModalTokenComponent} from './component/modal-token.component';

import {SharedModule} from '@shared/shared.module';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    ModalTokenComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule
  ],
  exports: [
    ModalTokenComponent
  ]
})
export class ModalTokenModule { }
