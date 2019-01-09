import { NgModule } from         '@angular/core';
import { CommonModule } from     '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  ConfigService,
  DateApiService,
  ToastService,
} from                           './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    DateApiService,
    ToastService,
  ]
})
export class ServicesModule { }
