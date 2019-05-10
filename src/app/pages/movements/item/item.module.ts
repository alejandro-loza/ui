import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { DateModule } from '../date/date.module';
import { ItemComponent } from './component/item.component';
import { ManualAccountEditerModule } from '../manual-account-editer/manual-account-editer.module';
import { ConceptTypeMovementModule } from '../concept-type-movement/concept-type-movement.module';

@NgModule({
	declarations: [ ItemComponent ],
	imports: [ SharedModule, DateModule, ConceptTypeMovementModule, ManualAccountEditerModule ],
	exports: [ ItemComponent ],
	providers: []
})
export class ItemModule {}
