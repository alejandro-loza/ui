import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CobrosComponent} from './cobros/cobros.component';
import {ComprasComponent} from './compras/compras.component';
import {TransferenciaComponent} from './transferencia/transferencia.component';

@NgModule({
  declarations: [
    CobrosComponent,
    ComprasComponent,
    TransferenciaComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CobrosComponent,
    ComprasComponent,
    TransferenciaComponent,
  ]
})
export class SecuritySvgModule { }
