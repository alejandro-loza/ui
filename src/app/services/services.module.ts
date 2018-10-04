import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from '../shared/materialize/materialize.module'; 

import {
  FinerioService,
  AuthService,
  AuthGuard
} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterializeModule
  ],
  declarations: [
  ],
  providers: [
    FinerioService,
    AuthService,
    AuthGuard,
  ]
})
export class ServicesModule { }
