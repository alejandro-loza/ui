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
        MzCheckboxModule
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
        MzCheckboxModule
    ],
    providers: [
    ]
})
export class MaterializeModule {}
