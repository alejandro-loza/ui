import { NgModule } from '@angular/core';
import { MzButtonModule, MzInputModule, MzIconMdiModule, MzIconModule } from 'ngx-materialize';

@NgModule({
    imports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule
    ],
    exports: [
        MzButtonModule,
        MzInputModule,
        MzIconMdiModule
    ],
    declarations: []
})
export class MaterializeModule {}
