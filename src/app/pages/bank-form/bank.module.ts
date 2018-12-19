import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Component 
import { BankComponent } from './components/bank.component';
import { SharedModule } from '@shared/shared.module';

// Routes
import { BANK_ROUTES } from './bank.route';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      BANK_ROUTES,
      SharedModule 
    ],
    declarations: [
        BankComponent
    ]
  })
  export class BankModule {}