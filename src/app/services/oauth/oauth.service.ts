import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {InstitutionInterface} from '@interfaces/institution.interface';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CredentialStatusEnum} from '@interfaces/credentials/oAuth/credential-status.enum';
import {CredentialOauthResponse} from '@interfaces/credentials/oAuth/credential-oauth-response';

import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';
import {CredentialCreateModel} from '@model/credential/credential.create.model';

import {CredentialOauthRequestService} from '@services/credentials/request/oauth/credential-oauth.request.service';

import {ModalAccountSyncComponent} from '@components/modal-account-sync/component/modal-account-sync.component';

import {Observable, throwError} from 'rxjs';
import {isNull} from 'util';
import {CredentialUpdateModel} from '@model/credential/credential-update.model';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';
import {catchError} from 'rxjs/operators';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private matDialogRef: MatDialogRef<any>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
    private credentialOauthRequestService: CredentialOauthRequestService,
    private cleanerService: CleanerService,
    private matDialog: MatDialog,
    private toastService: ToastService,
    private router: Router
  ) { }

  validateCredential( institution: InstitutionInterface ): Observable<HttpResponse<CredentialOauth>> {

    const oAuthCredential: CredentialCreateModel = new CredentialCreateModel( institution );

    return this.credentialOauthRequestService.createCredential( oAuthCredential ).pipe(

        catchError( ( error: HttpErrorResponse ) => {

          if ( error.status === 400 ) {

            this.toastService.setCode = 200;
            this.toastService.setMessage = '¡No puedes tener dos cuentas de Banregio, por seguridad!';
            this.toastService.toastGeneral();

          }

          return throwError( error );

        })

      );

  }

  updateCredential( credentialInterface: CredentialInterface ) {

    const oAuthCredential: CredentialUpdateModel = new CredentialUpdateModel( credentialInterface.id, credentialInterface.institution, credentialInterface.status );

    return this.credentialOauthRequestService.updateCredential( oAuthCredential ).pipe(

      catchError( ( error: HttpErrorResponse ) => {

        if ( error.status === 400 ) {

          this.toastService.setCode = 200;

          this.toastService.setMessage = 'Tu cuenta ya se encuentra activada';

          this.toastService.toastGeneral();

        }

        return throwError( error );
      })

    );

  }

  createOAuth( oAuthOptions: OAuthOptionsModel ): Window {

    return window.open( oAuthOptions.url, oAuthOptions.windowsName, oAuthOptions.options );

  }

  checkOauth( credential: CredentialInterface ): Observable<CredentialOauthResponse> {

    return this.angularFireDatabase.object<CredentialOauthResponse>(`/credentials/${credential.id}`).valueChanges();

  }

  createPopUp( res: HttpResponse<CredentialOauth> ) {

    const oAuthOption = new OAuthOptionsModel(res.body.authorizationUri, 'Finerio_/_Connect_With_BanRegio', 'location=0,status=0,centerscreen=1,width=1000,height=1000', res.body);

    const window = this.createOAuth( oAuthOption );

    this.checkOauth( res.body ).subscribe(
      auxRes => this.statesOauth( auxRes, window ) );
  }

  private statesOauth( credentialOauth: CredentialOauthResponse, window: Window ) {

    if ( isNull( credentialOauth ) ) {
      return;
    }

    if ( credentialOauth.status !== CredentialStatusEnum.VALIDATE ) {
      window.close();
    }

    if ( credentialOauth.status === CredentialStatusEnum.CREDENTIAL_CONNECT_SUCCESS ) {
      this.openDialog();
    }

    if ( credentialOauth.status === CredentialStatusEnum.MOVEMENTS_CREATE_END ) {
      this.cleanerService.cleanAllVariables();
    }


    if ( this.matDialogRef ) {

      this.setDataToModal( credentialOauth );

    }
  }

  private openDialog( data?: any ) {

    let matDialogConfig: MatDialogConfig<any>;

    matDialogConfig = {
      autoFocus: true,
      disableClose: true,
      closeOnNavigation: false,
      restoreFocus: true,
      width: '25vw',
      panelClass: 'custom-dialog'
    };

    if ( data ) {
      matDialogConfig.data = data;
    }

    if ( !this.matDialogRef ) {
      this.matDialogRef = this.matDialog.open(ModalAccountSyncComponent, matDialogConfig);
    }

    this.matDialogRef.afterClosed().subscribe( () => this.matDialogRef = undefined );

  }

  private setDataToModal( credential: CredentialOauthResponse ) {

    let auxAccount = credential.account;

    auxAccount = { ...auxAccount, status: credential.status };

    if ( isNull( this.matDialogRef.componentInstance ) ) {
      this.cleanerService.cleanAllVariables();
      return;
    }

    const accounts = this.matDialogRef.componentInstance.accounts;

    const hasAccount = accounts.find( account => account.id === auxAccount.id );

    const hasFinished = accounts.find( account => account.status === CredentialStatusEnum.MOVEMENTS_CREATE_END );

    if ( hasAccount ) {

      this.matDialogRef.componentInstance.accounts = accounts.map( account => {

        if ( account.id === auxAccount.id ) {

          account = { ...auxAccount };

        }

        if ( hasFinished ) {

          this.cleanerService.cleanAllVariables();

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
