import { NgModule } from                     '@angular/core';
import { CommonModule } from                 '@angular/common';
import { CategoryComponent } from            '@pages/categories/component/category/category.component';

import { MovementComponent } from            './movement.component';
import { DescriptionComponent } from         './description/description.component';
import { CuentaComponent } from              './cuenta/cuenta.component';
import { MontoComponent } from               './monto/monto.component';
import { ConsiderarComponent } from          './considerar/considerar.component';

@NgModule({
  declarations: [
    MovementComponent,
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
  ],
  imports: [
    CommonModule
  ], exports: [
    MovementComponent,
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
  ]
})
export class MovementModule { }
