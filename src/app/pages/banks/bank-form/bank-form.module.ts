import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';

import { BankFormComponent } from './component/bank-form.component';
import { BackButtonModule } from '@components/back-button/back-button.module';

import { BankFormRoutes } from './bank-form.routes';

@NgModule({
  declarations: [
    BankFormComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    BackButtonModule,
    BankFormRoutes
  ],
  providers: [ ]
})
export class BankFormModule { }
