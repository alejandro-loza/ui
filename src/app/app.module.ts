import { NgModule } from                  '@angular/core';
import { BrowserModule } from                        '@angular/platform-browser';
import { BrowserAnimationsModule } from              '@angular/platform-browser/animations';
import { AppRoutes } from                            '@app/app.route';
import { registerLocaleData } from                   '@angular/common';
import { AppComponent } from                         '@app/app.component';

import { AuthGuard } from                            '@services/guards/auth/auth.guard';
import { AuthService } from                          '@services/auth/auth.service';

import { SharedModule } from                         '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutes
  ],
  providers: [
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
