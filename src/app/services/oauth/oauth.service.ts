import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';

import {InstitutionInterface} from '@interfaces/institution.interface';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {CredentialCreateModel} from '@model/credential/credential.create.model';
import {OAuthOptionsModel} from '@model/oAuth/oAuth.options.model';

import {Observable} from 'rxjs';
import {CredentialService} from '@services/credentials/credential.service';
import {CredentialOauthResponse} from '@interfaces/credentials/oAuth/credential-oauth-response';
import {HttpResponse} from '@angular/common/http';
import {CredentialOauth} from '@interfaces/credentials/oAuth/credential-oauth';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
    private credentialService: CredentialService,
  ) { }

  validateCredential( institution: InstitutionInterface ): Observable<HttpResponse<CredentialOauth>> {

    const oAuthCredential: CredentialCreateModel = new CredentialCreateModel( institution );

    return this.credentialService.createCredential(oAuthCredential);

  }

  createOAuth( oAuthOptions: OAuthOptionsModel ): Window {

    return window.open( oAuthOptions.url, oAuthOptions.windowsName, oAuthOptions.options );

  }

  checkOauth( credential: CredentialInterface ): Observable<CredentialOauthResponse> {

    return this.angularFireDatabase.object<CredentialOauthResponse>(`/credentials/${credential.id}`).valueChanges();

  }

}
