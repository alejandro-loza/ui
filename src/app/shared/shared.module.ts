import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { MaterializeModule } from          './materialize/materialize.module';

import { NavbarComponent } from            './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
    NavbarComponent,
  ]
})
export class SharedModule { }
