import { NgModule } from                   '@angular/core';
import { CommonModule } from               '@angular/common';
import { RouterModule } from               '@angular/router';

import { MaterializeModule } from          './materialize/materialize.module';

import { NavbarComponent } from            './navbar/navbar.component';
import { SidenavComponent } from           './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [
    NavbarComponent,
    SidenavComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterializeModule,
    NavbarComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
