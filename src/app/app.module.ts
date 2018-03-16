import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.route'

import { AppComponent } from './app.component';
import { SignupComponent } from './access/signup/signup.component';
import { LoginComponent } from './access/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { ComponentsComponent } from './components/components.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PagesComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
