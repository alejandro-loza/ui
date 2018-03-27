import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.route';

import { AccessModule } from './access/access.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AccessModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
