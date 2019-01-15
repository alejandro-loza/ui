import { NgModule } from '@angular/core';
import { ImageComponent } from './component/image.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ImageComponent
  ]
})
export class ImageModule { }
