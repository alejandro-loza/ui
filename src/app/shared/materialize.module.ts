import { NgModule } from '@angular/core';
import { MzButtonModule, MzInputModule } from 'ngx-materialize';

@NgModule({
    imports: [
        MzButtonModule,
        MzInputModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule
    ]
})
export class MaterializeModule {}
