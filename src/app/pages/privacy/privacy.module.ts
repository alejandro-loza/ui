import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { PrivacyComponent } from './components/privacy.component';

// Routes
import { PRIVACY_ROUTES } from './privacy.route';

@NgModule({
  imports: [
    CommonModule,
    PRIVACY_ROUTES
  ],
  declarations: [ PrivacyComponent ]
})
export class PrivacyModule { }
