import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NavbarModule } from '@components/navbar/navbar.module';
import { ModalTokenModule } from '@components/modal-token/modal-token.module';

import { CategoriesService } from '@services/categories/categories.service';
import { CredentialService } from '@services/credentials/credential.service';
import { FieldService } from '@services/field/field.service';
import { MovementsService } from '@services/movements/movements.service';

import { PagesRoutes } from './pages.route';

import { PagesComponent } from '@pages/pages.component';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    SharedModule,
    ModalTokenModule,
    NavbarModule,
    PagesRoutes
  ],
  exports: [],
  providers: [
    CategoriesService,
    CredentialService,
    MovementsService,
    FieldService
  ]
})
export class PagesModule {}
