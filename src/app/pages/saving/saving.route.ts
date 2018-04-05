import { RouterModule, Route } from '@angular/router';

import { SavingComponent } from './components/saving.component';

const SAVING_ROUTING = [
    { path: '', component: SavingComponent }
];

export const SAVING_ROUTES = RouterModule.forChild(SAVING_ROUTING);