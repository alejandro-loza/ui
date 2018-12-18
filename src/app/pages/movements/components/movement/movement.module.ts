import { NgModule } from                     '@angular/core';
import { CommonModule } from                 '@angular/common';
import { FormsModule } from                  '@angular/forms';

import { CategoriesModule } from             '@pages/categories/categories.module';

import { DateApiService } from               '@services/date-api/date-api.service';

import { DescriptionComponent } from         './description/description.component';
import { CuentaComponent } from              './cuenta/cuenta.component';
import { MontoComponent } from               './monto/monto.component';
import { ConsiderarComponent } from          './considerar/considerar.component';
import { IngresoGastoComponent } from        './ingreso-gasto/ingreso-gasto.component';
import { FechaComponent } from               './fecha/fecha.component';

@NgModule({
  declarations: [
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
    IngresoGastoComponent,
    FechaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ], exports: [
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
    IngresoGastoComponent,
    FechaComponent,
  ], providers: [
    DateApiService
  ]
})
export class MovementModule { }
