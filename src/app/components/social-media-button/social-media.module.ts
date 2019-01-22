import { NgModule } from '@angular/core';
import { SocialMediaComponent } from './component/social-media.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ SocialMediaComponent ],
  imports: [ SharedModule ],
  exports: [ SocialMediaComponent ],
  providers: [],
})
export class SocialMediaModule {}
