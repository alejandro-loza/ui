import { NgModule } from           '@angular/core';
import { SharedModule } from       '@shared/shared.module';
import { SavingComponent } from    './components/saving.component';
import { SAVING_ROUTES } from      './saving.route';

@NgModule({
  imports: [
    SharedModule,
    SAVING_ROUTES
  ],
  declarations:[ SavingComponent ]
})
export class SavingModule { }
