import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component 
import { BanksComponent } from './components/banks.component';
import { SharedModule } from '@shared/shared.module';


// Routes
import { BANKS_ROUTES } from './banks.route';

@NgModule({
    imports: [
      CommonModule,
      BANKS_ROUTES,
      SharedModule
    ],
    declarations: [
        BanksComponent
    ]
  })
  export class BanksModule {}
  