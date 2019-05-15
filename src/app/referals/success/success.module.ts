import { NgModule } from '@angular/core';
// ROUTE
import { SUCCESS_ROUTES } from './success.route';

// COMPONENT
import { SuccessComponent } from './components/success.component';
import { SvgIconsModule } from '@app/svg/svg-icons.module';

@NgModule({
	imports: [ SvgIconsModule, SUCCESS_ROUTES ],
	declarations: [ SuccessComponent ]
})
export class SuccessModule {}
