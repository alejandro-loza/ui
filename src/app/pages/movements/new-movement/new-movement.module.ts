import { NgModule } from                   '@angular/core';

import { SharedModule } from               '@shared/shared.module';
import { TypeModule } from                 '../movement-detail/type/type.module';

import { DateApiService } from             '@services/date-api/date-api.service';
import { MovementsService } from           '@services/movements/movements.service';
import { ToastService } from               '@services/toast/toast.service';

import { NewMovementComponent } from       './component/new-movement.component';


@NgModule({
  declarations: [ NewMovementComponent ],
  imports: [
    SharedModule,
    TypeModule
  ],
  exports: [ NewMovementComponent ],
  providers: [
    DateApiService,
    MovementsService,
    ToastService,
  ],
})
export class NewMovementModule {}
