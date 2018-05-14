import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  FinerioService,
  AuthService,
  AuthGuard
} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
    FinerioService,
    AuthService,
    AuthGuard
  ]
})
export class ServicesModule { }
