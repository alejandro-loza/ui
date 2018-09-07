import { NgModule } from '@angular/core';
import { MzButtonModule, MzInputModule, MzIconMdiModule, MzToastModule } from 'ngx-materialize';

@NgModule({
    imports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzToastModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule,
        MzToastModule,
    ],
    providers: [
    ]
})
export class MaterializeModule {}
