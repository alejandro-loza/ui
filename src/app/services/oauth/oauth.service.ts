import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpResponse} from '@angular/common/http';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {InstitutionInterface} from '@interfaces/institution.interface';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CredentialStatusEnum} from '@interfaces/credentials/oAuth/credential-status.enum';
import {CredentialOauthResponse} from '@interfaces/credentials/oAuth/credential-oauth-response';

import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';
import {CredentialCreateModel} from '@model/credential/credential.create.model';

import {CredentialOauthRequestService} from '@services/credentials/request/oauth/credential-oauth.request.service';

import {ModalAccountSyncComponent} from '@components/modal-account-sync/component/modal-account-sync.component';

import {Observable} from 'rxjs';
import {isNull} from 'util';
import {CredentialUpdateModel} from '@model/credential/credential-update.model';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private matDialogRef: MatDialogRef<any>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
    private credentialOauthRequestService: CredentialOauthRequestService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  validateCredential( institution: InstitutionInterface ): Observable<HttpResponse<CredentialOauth>> {

    const oAuthCredential: CredentialCreateModel = new CredentialCreateModel( institution );

    return this.credentialOauthRequestService.createCredential( oAuthCredential );

  }

  updateCredential( oAuthCredential: CredentialUpdateModel ) {

    return this.credentialOauthRequestService.updateCredential( oAuthCredential );

  }

  createOAuth( oAuthOptions: OAuthOptionsModel ): Window {

    return window.open( oAuthOptions.url, oAuthOptions.windowsName, oAuthOptions.options );

  }

  checkOauth( credential: CredentialInterface ): Observable<CredentialOauthResponse> {

    return this.angularFireDatabase.object<CredentialOauthResponse>(`/credentials/${credential.id}`).valueChanges();

  }

  statesOauth( credentialOauth: CredentialOauthResponse, window: Window ) {

    if ( isNull( credentialOauth ) ) {
      return;
    }

    if ( credentialOauth.status !== CredentialStatusEnum.VALIDATE ) {
      window.close();
    }

    if ( credentialOauth.status === CredentialStatusEnum.CREDENTIAL_CONNECT_SUCCESS ) {
      this.openDialog();
    }

    if ( this.matDialogRef ) {

      this.setDataToModal( credentialOauth );

    }
  }

  private openDialog( data?: any ) {
    let matDialogConfig: MatDialogConfig<any>;

    matDialogConfig = {
      autoFocus: true,
      disableClose: false,
      closeOnNavigation: false,
      restoreFocus: true,
      width: '20%',
      panelClass: 'custom-dialog'
    };

    if ( data ) {
      matDialogConfig.data = data;
    }

    if ( !this.matDialogRef ) {
      this.matDialogRef = this.matDialog.open(ModalAccountSyncComponent, matDialogConfig);
    }

  }

  private setDataToModal( credential: CredentialOauthResponse ) {

    let auxAccount = credential.account;

    auxAccount = { ...auxAccount, status: credential.status };

    const accounts = this.matDialogRef.componentInstance.accounts;

    const hasAccount = accounts.find( account => account.id === auxAccount.id );

    const hasFinished = accounts.find( account => account.status === CredentialStatusEnum.MOVEMENTS_CREATE_END );

    if ( hasAccount ) {

      this.matDialogRef.componentInstance.accounts = accounts.map( account => {

        if ( account.id === auxAccount.id ) {

          account = { ...auxAccount };

        }

        if ( hasFinished ) {
          this.matDialogRef.componentInstance.hasFinished = hasFinished;
          this.router.navigate(['/app/credentials']).then();
        }

        return account;

      });

    } else if (auxAccount.id) {

      accounts.push(auxAccount);

    }

  }

}
