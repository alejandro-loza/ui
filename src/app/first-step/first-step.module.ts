import { NgModule } from '@angular/core';
import { FirstStepComponent } from './component/first-step.component';
import {SharedModule} from '@shared/shared.module';
import {FirstStepRoutes} from '@app/first-step/first-step.routes';
import {UserService} from '@services/user/user.service';

@NgModule({
  declarations: [
    FirstStepComponent
  ],
  imports: [
    SharedModule,
    FirstStepRoutes
  ],
  providers: [
    UserService
  ]
})
export class FirstStepModule { }
