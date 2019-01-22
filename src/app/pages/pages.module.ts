import { NgModule } from             '@angular/core';

import { SharedModule } from         '@shared/shared.module';

import { PagesRoutes } from          './pages.route';

import { PagesComponent } from       '@pages/pages.component';

import { NavbarModule } from         '@components/navbar/navbar.module';

@NgModule({
  imports: [
    SharedModule,
    NavbarModule,
    PagesRoutes
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule {}
