import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { NavbarModule } from '@components/navbar/navbar.module';
import { ModalTokenModule } from '@components/modal-token/modal-token.module';
import {ModalTokenComponent} from '@components/modal-token/component/modal-token.component';

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
    NavbarModule,
    PagesRoutes
  ],
  providers: [
    CategoriesService,
    CredentialService,
    MovementsService,
    FieldService
  ],
  exports: [],
})
export class PagesModule {}
