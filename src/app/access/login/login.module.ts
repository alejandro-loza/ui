import { NgModule } from                             '@angular/core';
import { FormsModule } from                          '@angular/forms';
import { HttpClientModule } from                     '@angular/common/http';
import { SharedModule } from                         '@shared/shared.module';

import { LoginRoutes } from                         './login.route';

import { LoginComponent } from                       './components/login.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    HttpClientModule,
    LoginRoutes
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
