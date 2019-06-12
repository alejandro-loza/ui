import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from './spinner/spinner.module';
import {LoadingModule} from './loading/loading.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerModule,
    LoadingModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerModule,
    LoadingModule
  ]
})
export class SharedModule {}
