import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from './spinner/spinner.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SpinnerModule
  ]
})
export class SharedModule {}
