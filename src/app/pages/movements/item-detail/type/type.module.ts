import { NgModule } from '@angular/core';
import { TypeComponent } from './component/type.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    TypeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TypeComponent
  ]
})
export class TypeModule { }
