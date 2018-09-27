import { NgModule } from    '@angular/core';
import {
    MzMediaModule,
    MzButtonModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzToastModule,
    MzNavbarModule,
    MzSidenavModule
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
        MzSidenavModule
    ],
    exports: [
        MzMediaModule,
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
        MzNavbarModule,
        MzSidenavModule
    ],
    providers: [
    ]
})
export class MaterializeModule {}
