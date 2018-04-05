import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { SavingComponent } from './components/saving.component';

// Routes
import { SAVING_ROUTES } from './saving.route';

@NgModule({
  imports: [
    CommonModule,
    SAVING_ROUTES
  ],
  declarations:[ SavingComponent ]
})
export class SavingModule { }
