import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CobrosComponent} from './cobros/cobros.component';
import {ComprasComponent} from './compras/compras.component';
import {TransferenciaComponent} from './transferencia/transferencia.component';
import { TitleSecurityHelpComponent } from './title-security-help/title-security-help.component';
import { CreditCardSecurityComponent } from './credit-card-security/credit-card-security.component';
import { RibbonSecurityComponent } from './ribbon-security/ribbon-security.component';

@NgModule({
  declarations: [
    CobrosComponent,
    ComprasComponent,
    TransferenciaComponent,
    TitleSecurityHelpComponent,
    CreditCardSecurityComponent,
    RibbonSecurityComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CobrosComponent,
    ComprasComponent,
    TransferenciaComponent,
    TitleSecurityHelpComponent,
    CreditCardSecurityComponent,
    RibbonSecurityComponent,
  ]
})
export class SecuritySvgModule { }
