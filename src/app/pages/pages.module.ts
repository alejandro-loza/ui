import { NgModule } from             '@angular/core';
import { HttpClientModule } from     '@angular/common/http'

import { PagesRoutes } from         './pages.route';
import { SharedModule } from         '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    HttpClientModule,
    PagesRoutes  ]
})
export class PagesModule {}
