import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { InstitutionService } from '@services/institution/institution.service';

import { BanksComponent } from './component/banks.component';

import { BanksRoutes } from './banks.routes';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { FieldService } from '@app/services/field/field.service';
import { CredentialService } from '@app/services/credentials/credential.service';

@NgModule({
  imports: [
    SharedModule,
    BackButtonModule,
    BanksRoutes
  ],
  declarations: [
    BanksComponent
  ],
  providers: [

  ]
})
export class BanksModule { }
