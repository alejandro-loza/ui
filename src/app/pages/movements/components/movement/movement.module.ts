import { NgModule } from                     '@angular/core';
import { CommonModule } from                 '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryComponent } from            '@pages/categories/component/category/category.component';

import { DescriptionComponent } from         './description/description.component';
import { CuentaComponent } from              './cuenta/cuenta.component';
import { MontoComponent } from               './monto/monto.component';
import { ConsiderarComponent } from          './considerar/considerar.component';
import { IngresoGastoComponent } from        './ingreso-gasto/ingreso-gasto.component';
import { FechaComponent } from               './fecha/fecha.component';

@NgModule({
  declarations: [
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
    IngresoGastoComponent,
    FechaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], exports: [
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
    IngresoGastoComponent,
    FechaComponent,
  ]
})
export class MovementModule { }
