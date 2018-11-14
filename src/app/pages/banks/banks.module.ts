import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component 
import { BanksComponent } from './components/banks.component';

// Routes
import { BANKS_ROUTES } from './banks.route';

@NgModule({
    imports: [
      CommonModule,
      BANKS_ROUTES 
    ],
    declarations: [
        BanksComponent
    ]
  })
  export class BanksModule {}
  