import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyStatesComponent } from './components/empty-states.component';

@NgModule({
	imports: [ RouterModule ],
	declarations: [ EmptyStatesComponent ],
	exports: [ EmptyStatesComponent ]
})
export class EmptyStateModule {}
