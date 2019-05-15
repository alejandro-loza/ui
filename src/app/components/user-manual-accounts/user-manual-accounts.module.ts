import { NgModule } from '@angular/core';
import { UserManualAccountsComponent } from './components/user-manual-accounts.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [ UserManualAccountsComponent ],
	imports: [ SharedModule ],
	exports: [ UserManualAccountsComponent ]
})
export class UserManualAccountsModule {}
