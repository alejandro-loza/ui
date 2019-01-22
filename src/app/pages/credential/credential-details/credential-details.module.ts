import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

// Component
import { CredentialDetailsComponent } from './components/credential-details.component';

// Route
import { CREDENTIAL_DETAILS_ROUTES } from './credential-details.route';
import { BackButtonModule } from '@components/back-button/back-button.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    BackButtonModule,
    CREDENTIAL_DETAILS_ROUTES
  ],
  declarations: [
    CredentialDetailsComponent
  ]
})
export class CredentialDetailsModule {}
