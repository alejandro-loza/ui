import { NgModule } from '@angular/core';
import {
    MzButtonModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzToastModule } from 'ngx-materialize';

@NgModule({
    imports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
    ],
    providers: [
    ]
})
export class MaterializeModule {}
