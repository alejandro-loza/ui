import { NgModule } from             '@angular/core';
import { HttpClientModule } from     '@angular/common/http'

import { SharedModule } from         '@shared/shared.module';

import { PagesRoutes } from          './pages.route';

import { PagesComponent } from       '@pages/pages.component';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    PagesRoutes 
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule {}
