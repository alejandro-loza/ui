import { Routes, RouterModule } from          '@angular/router';
import { ModuleWithProviders } from           '@angular/core';

import { WelcomeComponent } from              './components/welcome.component';

const WelcomeRouting: Routes = [
    { path: '', component: WelcomeComponent }
];

export const WelcomeRoutes: ModuleWithProviders = RouterModule.forChild( WelcomeRouting );
