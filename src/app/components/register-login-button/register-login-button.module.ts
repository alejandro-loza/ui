import { NgModule } from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {RegisterLoginComponent} from "./component/register-login.component";

@NgModule({
  declarations: [
    RegisterLoginComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    RegisterLoginComponent
  ],
  providers: []
})
export class RegisterLoginButtonModule { }
