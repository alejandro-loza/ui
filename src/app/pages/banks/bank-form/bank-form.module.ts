import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';

import { BankFormComponent } from './component/bank-form.component';

import { BankFormRoutes } from './bank-form.routes';

@NgModule({
  declarations: [
    BankFormComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    BankFormRoutes
  ],
  providers: [
    FieldService,
    CredentialService
  ]
})
export class BankFormModule { }
