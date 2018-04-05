import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { PAGES_ROUTES } from './pages.route';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    HttpClientModule
  ]
})
export class PagesModule { }
