import { NgModule } from '@angular/core';
import { NavbarComponent } from './component/navbar.component';
import { LinkComponent } from './link/link.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    LinkComponent
  ],
  imports: [ SharedModule ],
  exports: [ NavbarComponent ],
  providers: [],
})
export class NavbarModule {}
