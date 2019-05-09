import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonModule } from '@components/back-button/back-button.module';
import { SharedModule } from '@shared/shared.module';

// Component
import { ManualAccountComponent } from './components/manual-account.component';

// Route
import { MANUAL_ACCOUNT_ROUTER } from './manual-account.route';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

@NgModule({
	imports: [ CommonModule, SharedModule, BackButtonModule, MANUAL_ACCOUNT_ROUTER ],
	declarations: [ ManualAccountComponent, AccountsListComponent ]
})
export class ManualAccountModule {}
