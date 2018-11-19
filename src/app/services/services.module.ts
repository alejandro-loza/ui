import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  ConfigService,
  AuthService,
  AuthGuard,
  MovementsService
} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    AuthService,
    AuthGuard,
    MovementsService
  ]
})
export class ServicesModule { }
