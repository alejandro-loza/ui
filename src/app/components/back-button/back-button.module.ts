import { NgModule } from '@angular/core';
import { BackButtonComponent } from './component/back-button.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ BackButtonComponent ],
  imports: [ SharedModule ],
  exports: [ BackButtonComponent ],
  providers: [],
})
export class BackButtonModule {}
