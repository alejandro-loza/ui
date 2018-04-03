import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
	AuthService
} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
  	AuthService
  ]
})
export class ServicesModule { }
