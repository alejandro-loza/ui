import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

// ROUTE
import { RECOVERY_ROUTES } from './recoverypassword.route';

// COMPONENT
import { RecoverypasswordComponent } from './components/recoverypassword.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    SvgIconsModule,
    RECOVERY_ROUTES,
  ],
  declarations: [
    RecoverypasswordComponent
  ],
  providers: [ ]
})
export class RecoverypasswordModule { }
