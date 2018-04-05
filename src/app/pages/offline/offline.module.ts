import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COmponent
import { OfflineComponent } from './components/offline.component';

// Route
import { OFFLINE_ROUTES } from './offline.route';

@NgModule({
  imports: [
    CommonModule,
    OFFLINE_ROUTES
  ],
  declarations: [ OfflineComponent ]
})
export class OfflineModule { }
