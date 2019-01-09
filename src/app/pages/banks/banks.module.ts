import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { InstitutionService } from '@services/institution/institution.service';

import { BanksComponent } from './component/banks.component';

import { BanksRoutes } from './banks.routes';

@NgModule({
  imports: [
    SharedModule,
    BanksRoutes
  ],
  declarations: [
    BanksComponent
  ],
  providers: [
    InstitutionService
  ]
})
export class BanksModule { }
