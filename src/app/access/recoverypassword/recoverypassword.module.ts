import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService } from '@services/password/password.service';

// ROUTE
import { RECOVERY_ROUTES } from './recoverypassword.route';

// COMPONENT
import { RecoverypasswordComponent } from './components/recoverypassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RECOVERY_ROUTES,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecoverypasswordComponent
  ],
  providers: [ PasswordService ]
})
export class RecoverypasswordModule { }
