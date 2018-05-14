import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COmponents
import { TermsComponent } from './components/terms.component';

// Routes
import { TERMS_ROUTES } from './terms.route';

@NgModule({
  imports: [
    CommonModule,
    TERMS_ROUTES
  ],
  declarations: [ TermsComponent ]
})
export class TermsModule { }
