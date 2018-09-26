import { NgModule } from                             '@angular/core';
import { BrowserModule } from                        '@angular/platform-browser';
import { BrowserAnimationsModule } from              '@angular/platform-browser/animations';

import { ServicesModule } from                       '@services/services.module';

import { APP_ROUTES } from                           '@app/app.route';

import { AppComponent } from                         '@app/app.component';
import { PagesComponent } from                       '@pages/pages.component';
import { AccessComponent } from                      '@access/access.component';
import { SharedModule } from                         '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ServicesModule,
    BrowserAnimationsModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
