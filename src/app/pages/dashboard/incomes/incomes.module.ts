import { NgModule } from '@angular/core';

import { IncomesComponent } from './component/incomes.component';
import { SeeMovementsButtonModule } from '../see-movements-button/see-movements-button.module';
import { SharedDashboardModule } from '../sharedDashboard/sharedDashboard.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [ IncomesComponent ],
	imports: [ SharedModule, SharedDashboardModule, SeeMovementsButtonModule ],
	exports: [ IncomesComponent ]
})
export class IncomesModule {}
