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
    MzDropdownModule
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
        MzDropdownModule
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
        MzDropdownModule
    ],
    providers: [
    ]
})
export class MaterializeModule {}
