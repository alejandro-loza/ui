import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { ACCESS_ROUTES } from './access.route';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ACCESS_ROUTES,
    HttpClientModule
  ]
})
export class AccessModule { }
