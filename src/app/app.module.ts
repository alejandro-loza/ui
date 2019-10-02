import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {MatDialogModule} from '@angular/material';

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
import { FirebaseModule } from './firebase/firebase.module';

import { AppRoutes } from '@app/app.route';
import { AppComponent } from '@app/app.component';
import {StatefulModule} from '@stateful/stateful.module';
import {ModalTokenModule} from '@components/modal-token/modal-token.module';
import {ModalAccountSyncModule} from '@components/modal-account-sync/modal-account-sync.module';

import {ModalTokenComponent} from '@components/modal-token/component/modal-token.component';
import {ModalAccountSyncComponent} from '@components/modal-account-sync/component/modal-account-sync.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FirebaseModule,
    HttpClientModule,
    MatDialogModule,
    ModalTokenModule,
    ModalAccountSyncModule,
    NgIdleKeepaliveModule.forRoot(),
    SharedModule,
    StatefulModule,
    AppRoutes
  ],
  providers: [
    AuthGuard,
    AuthService,
    AccountService,
    ConfigParamsService,
    ConfigService,
    InstitutionService,
    ToastService,
    InterceptorProvider
  ],
  entryComponents: [
    ModalTokenComponent,
    ModalAccountSyncComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
