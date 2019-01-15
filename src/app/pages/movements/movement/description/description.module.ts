import { NgModule } from '@angular/core';
import { DescriptionComponent } from './component/description.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DescriptionComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DescriptionComponent
  ]
})
export class DescriptionModule { }
