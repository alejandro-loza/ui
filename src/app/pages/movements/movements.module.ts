import { NgModule } from                   '@angular/core';
import { SharedModule } from               '@shared/shared.module';

import { MovementsRoutes } from            './movements.route';

import { MovementsComponent } from         './components/movements.component';

import { MovementComponent } from          './components/movement/movement.component';
import { CategoryComponent } from          '../categories/component/category/category.component';
import { DescriptionComponent } from './components/movement/description/description.component';
import { CuentaComponent } from './components/movement/cuenta/cuenta.component';
import { MontoComponent } from './components/movement/monto/monto.component';
import { ConsiderarComponent } from './components/movement/considerar/considerar.component';

@NgModule({
  imports: [
    SharedModule,
    MovementsRoutes
  ],
  declarations: [ 
    MovementsComponent,
    MovementComponent,
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent
  ]
})
export class MovementsModule { }
