import { NgModule } from '@angular/core';
import { NavbarComponent } from './component/navbar.component';
import { LinkComponent } from './link/link.component';
import { SharedModule } from '@shared/shared.module';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

@NgModule({
  declarations: [
    NavbarComponent,
    LinkComponent
  ],
  imports: [ SharedModule, SvgIconsModule ],
  exports: [ NavbarComponent ],
  providers: [],
})
export class NavbarModule {}
