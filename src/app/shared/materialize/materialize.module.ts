import { NgModule } from '@angular/core';
import {
    MzButtonModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    MzToastModule,
    MzCheckboxModule,
    MzModalModule 
 } from 'ngx-materialize';

@NgModule({
    imports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
        MzCheckboxModule,
        MzModalModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzIconModule,
        MzToastModule,
        MzCheckboxModule,
        MzModalModule
    ],
    providers: [
    ]
})
export class MaterializeModule {}
