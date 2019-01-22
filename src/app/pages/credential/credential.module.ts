import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


// Component
import { CredentialComponent } from './components/credential.component';
import { SharedModule } from '@shared/shared.module';

// Route
import { CREDENTIAL_ROUTES } from './credential.route';
import { BackButtonModule } from '@components/back-button/back-button.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    BackButtonModule,
    CREDENTIAL_ROUTES,
  ],
  declarations: [
    CredentialComponent
  ]
})
export class CredentialModule { }
