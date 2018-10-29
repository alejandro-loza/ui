import { NgModule } from    '@angular/core';
import {
    MzMediaModule,
    MzButtonModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzToastModule,
    MzNavbarModule,
    MzSidenavModule,
    MzCheckboxModule,
    MzDropdownModule,
    MzSpinnerModule
 } from                     'ngx-materialize';

@NgModule({
    imports: [
        MzMediaModule,
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
        MzNavbarModule,
        MzSidenavModule,
        MzCheckboxModule,
        MzDropdownModule,
        MzSpinnerModule
    ],
    exports: [
        MzMediaModule,
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
        MzNavbarModule,
        MzSidenavModule,
        MzCheckboxModule,
        MzDropdownModule,
        MzSpinnerModule
    ],
    providers: [ ]
})
export class MaterializeModule {}
