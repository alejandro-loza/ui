import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Component
import { CredentialComponent } from './components/credential.component';
import { SharedModule } from '@shared/shared.module';

// Route
import { CREDENTIAL_ROUTES } from './credential.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CREDENTIAL_ROUTES,
  ],
  declarations: [ CredentialComponent ]
})
export class CredentialModule { }
