import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages.route'

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component'

@NgModule({
  declarations: [
  	PagesComponent,
  	DashboardComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
