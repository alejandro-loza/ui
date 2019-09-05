import { Injectable } from '@angular/core';
import {CreateCredentialInterface} from '@interfaces/credentials/createCredential.interface';
import {StatefulInstitutionService} from '@stateful/institution/stateful-institution.service';
import {CredentialService} from '@services/credentials/credential.service';
import {InstitutionInterface} from '@interfaces/institution.interface';
import {CredentialCreateModel} from '@app/model/credential/credential.create.model';
import {OAuthOptionsModel} from '@app/model/oAuth/oAuth.options.model';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private window: Window;
  private loopCount: number;Z
  constructor(
    private statefulInstitution: StatefulInstitutionService,
    private credentialService: CredentialService,
  ) { }

  createCredential( institution: InstitutionInterface ) {
    let oAuthOptions: OAuthOptionsModel;
    const oAuthCredential: CredentialCreateModel = new CredentialCreateModel( institution );
    const url = 'https://sandbox.banregio.com/oauth/authorize?response_type=code&client_id=aZfySrNbI40Ezf5pCxAAcp7YtuZo3' +
      '0VKWVDlp4ln&redirect_uri=http://40.87.6.75/api/banregio/oauth2/authorize&state=eyJBcHBsaWNhdGlvbklkIjoiMSIsIkNyZW' +
      'RlbnRpYWxJZCI6ImUxZGNjNDUwLTI2NzctNDM3ZS1iMTNkLWJiODU1YmIwZWZhNyIsIlJlZGlyZWN0VXJpIjoiaHR0cDovL2Fyb25wdW5hbC5jb20iLCJTdGF0ZSI6bnVsbH0=';
    oAuthOptions = new OAuthOptionsModel(url, 'Finerio_/_Connect_With_BanRegio', 'location=0,status=0,centerscreen=1,width=1000,height=1000');
    this.createOAuth( oAuthOptions );
    this.doAuthorization();
    // this.credentialService.createCredential(oAuthCredential).subscribe(
    //   res => {
    //     if ( res.body.redirectUri ) {
    //       oAuthOptions = new OAuthOptionsModel(res.body.redirectUri, 'Finerio_/_Connect_With_BanRegio', 'location=0,status=0,centerscreen=1,width=1000,height=1000');
    //        this.createOAuth( this.oAuthOptions );
    //     }
    //   }
    // );
  }

  private createOAuth( oAuthOptions: OAuthOptionsModel ) {
    // todo Aquí se va a crear el oAuth, por medio de un popup
    let oAuthWindow: Window;

    ( !isUndefined(oAuthWindow) && oAuthWindow.closed ) ? oAuthWindow.focus() : oAuthWindow = window.open( oAuthOptions.url, oAuthOptions.windowsName, oAuthOptions.options );

  }

  private doAuthorization() {

  }


}
