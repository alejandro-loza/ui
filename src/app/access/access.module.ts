import { NgModule } from           '@angular/core';
import { AcessRoutes } from      '@access/access.route';
import { SharedModule } from       '@shared/shared.module';
import { AccessComponent } from '@access/access.component';

@NgModule({
  imports: [
    SharedModule,
    AcessRoutes
  ],
  declarations: [
    AccessComponent
  ]
})
export class AccessModule { }
  