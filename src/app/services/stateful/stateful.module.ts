import { NgModule } from '@angular/core';

import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {StatefulBalanceAccountService} from '@stateful/balance/account/stateful-balance-account.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';
import {StatefulMovementsService} from '@services/stateful/movements/stateful-movements.service';

import {SharedModule} from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    StatefulAccountService,
    StatefulAccountsService,
    StatefulBalanceAccountService,
    StatefulCredentialService,
    StatefulCredentialsService,
    StatefulInstitutionService,
    StatefulInstitutionsService,
    StatefulMovementsService,
  ]
})
export class StatefulModule { }
