import { NgModule } from '@angular/core';
import {ModalTokenComponent} from './component/modal-token.component';
import {FieldService} from '@services/field/field.service';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    ModalTokenComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    FieldService
  ]
})
export class ModalTokenModule { }
