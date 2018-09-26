import { NgModule } from           '@angular/core';
import { ACCESS_ROUTES } from      '@access/access.route';
import { SharedModule } from       '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ACCESS_ROUTES
  ],
  declarations: []
})
export class AccessModule { }
