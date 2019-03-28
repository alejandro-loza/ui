import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { EmptyStateModule } from '@components/empty-states/empty-states.module';

// Component
import { CredentialComponent } from './components/credential.component';
import { CredentialItemComponent } from './credential-item/credential-item.component';

// Route
import { CREDENTIAL_ROUTES } from './credential.route';
import { BackButtonModule } from '@components/back-button/back-button.module';

@NgModule({
	imports: [ SharedModule, BackButtonModule, EmptyStateModule, CREDENTIAL_ROUTES ],
	declarations: [ CredentialComponent, CredentialItemComponent ]
})
export class CredentialModule {}
