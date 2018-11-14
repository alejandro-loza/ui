import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component 
import { BankComponent } from './components/bank.component';

// Routes
import { BANK_ROUTES } from './bank.route';

@NgModule({
    imports: [
      CommonModule,
      BANK_ROUTES 
    ],
    declarations: [
        BankComponent
    ]
  })
  export class BankModule {}