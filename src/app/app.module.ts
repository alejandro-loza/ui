import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { AuthGuard } from '@guards/auth/auth.guard';

import { InterceptorProvider } from '@security/interceptors.index';

import { ConfigService } from '@services/config/config.service';
import { AuthService } from '@services/auth/auth.service';
import { ToastService } from '@services/toast/toast.service';
import { AccountService } from '@services/account/account.service';
import { ConfigParamsService } from '@params/config/config-params.service';
import { InstitutionService } from '@services/institution/institution.service';

import { SharedModule } from '@shared/shared.module';
import { AppRoutes } from '@app/app.route';

import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NgIdleKeepaliveModule.forRoot(),
    AppRoutes
  ],
  providers: [
    AuthGuard,
    AuthService,
    AccountService,
    ConfigService,
    ConfigParamsService,
    InstitutionService,
    ToastService,
    InterceptorProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
