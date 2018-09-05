import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MzButtonModule, MzInputModule } from 'ngx-materialize';

@NgModule({
    imports: [
        CommonModule,
        MzButtonModule,
        MzInputModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule
    ]
})
export class MaterializeModule {}
