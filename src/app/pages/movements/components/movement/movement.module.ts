import { NgModule } from                     '@angular/core';
import { CommonModule } from                 '@angular/common';
import { MatSlideToggleModule } from           '@angular/material/slide-toggle';
import { CategoryComponent } from            '@pages/categories/component/category/category.component';

import { DescriptionComponent } from         './description/description.component';
import { CuentaComponent } from              './cuenta/cuenta.component';
import { MontoComponent } from               './monto/monto.component';
import { ConsiderarComponent } from          './considerar/considerar.component';

@NgModule({
  declarations: [
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule
  ], exports: [
    CategoryComponent,
    DescriptionComponent,
    CuentaComponent,
    MontoComponent,
    ConsiderarComponent,
    MatSlideToggleModule
  ]
})
export class MovementModule { }
