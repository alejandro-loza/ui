import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTE
import { RECOVERY_ROUTES } from './recoverypassword.route';

// COMPONENT
import { RecoverypasswordComponent } from './components/recoverypassword.component';

@NgModule({
  imports: [
    CommonModule,
    RECOVERY_ROUTES
  ],
  declarations: [
    RecoverypasswordComponent
  ]
})
export class RecoverypasswordModule { }
