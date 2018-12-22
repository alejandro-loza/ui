import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  AuthGuard,
  AuthService,
  ConfigService,
  DateApiService,
  MovementsService,
  ToastService,
} from                           './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    ConfigService,
    DateApiService,
    MovementsService,
    ToastService,
  ]
})
export class ServicesModule { }
