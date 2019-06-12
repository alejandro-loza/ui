import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingComponent} from '@shared/loading/component/loading.component';

@NgModule({
  declarations: [ LoadingComponent ],
  imports: [ CommonModule ],
  exports: [ LoadingComponent ]
})
export class LoadingModule { }
