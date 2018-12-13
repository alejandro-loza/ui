import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

// Component
import { CredentialDetailsComponent } from         './components/credential-details.component';

// Route
import { CREDENTIAL_DETAILS_ROUTES } from './credential-details.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CREDENTIAL_DETAILS_ROUTES,
    SharedModule
  ],
  declarations: [ 
    CredentialDetailsComponent ]
})
export class CredentialDetailsModule { }
