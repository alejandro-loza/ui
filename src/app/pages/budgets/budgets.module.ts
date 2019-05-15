import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

// Routes
import { BUDGETS_ROUTES } from './budgets.route';

// Components
import { BudgetsComponent } from './components/budgets.component';
import {SvgIconsModule} from '@app/svg/svg-icons.module';

@NgModule({
  imports: [
    SharedModule,
    EmptyStateModule,
    BUDGETS_ROUTES,
    SvgIconsModule
  ],
  declarations: [
    BudgetsComponent
  ],
  providers: [ ]
})
export class BudgetsModule {}
