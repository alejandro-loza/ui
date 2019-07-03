import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    StatefulAccountService,
    StatefulAccountsService,
    StatefulCredentialService,
    StatefulCredentialsService,
    StatefulInstitutionsService,
    StatefulMovementsService,
  ]
})
export class StatefulModule { }
