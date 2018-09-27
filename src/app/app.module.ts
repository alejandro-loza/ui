import { NgModule } from                             '@angular/core';
import { BrowserModule } from                        '@angular/platform-browser';
import { BrowserAnimationsModule } from              '@angular/platform-browser/animations';
import { AppRoutes } from                            '@app/app.route';
import { AppComponent } from                         '@app/app.component';
import { PagesComponent } from                       '@pages/pages.component';
import { AccessComponent } from                      '@access/access.component';
import { ServicesModule } from                       '@services/services.module';
import { SharedModule } from                         '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ServicesModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
