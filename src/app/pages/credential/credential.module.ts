import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { CredentialComponent } from './components/credential.component';

// Route
import { CREDENTIAL_ROUTES } from './credential.route';

@NgModule({
  imports: [
    CommonModule,
    CREDENTIAL_ROUTES
  ],
  declarations: [ CredentialComponent ]
})
export class CredentialModule { }
