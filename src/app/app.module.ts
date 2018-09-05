import { NgModule } from                             '@angular/core';
import { BrowserModule } from                        '@angular/platform-browser';
import { BrowserAnimationsModule } from              '@angular/platform-browser/animations';
import { ServicesModule } from                       './services/services.module';

import { APP_ROUTES } from                           './app.route';

import { AppComponent } from                         './app.component';
import { ComponentsComponent } from                  './components/components.component';
import { AccessComponent } from                      './access/access.component';
import { PagesComponent } from                       './pages/pages.component';
import { MaterializeModule } from                    './shared/materialize.module';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    AccessComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ServicesModule,
    BrowserAnimationsModule,
    MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
