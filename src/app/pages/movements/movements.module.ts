import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { MovementsComponent } from './components/movements.component';

// Routes
import { MOVEMENTS_ROUTES } from './movements.route';

@NgModule({
  imports: [
    CommonModule,
    MOVEMENTS_ROUTES
  ],
  declarations: [ MovementsComponent ]
})
export class MovementsModule { }
