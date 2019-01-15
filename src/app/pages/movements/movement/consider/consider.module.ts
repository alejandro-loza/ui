import { NgModule } from '@angular/core';
import { ConsiderComponent } from './component/consider.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ConsiderComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ConsiderComponent
  ]
})
export class ConsiderModule { }
