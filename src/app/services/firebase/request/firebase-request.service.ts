import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {StatefulFirebaseService} from '@stateful/firebase/stateful-firebase.service';
import {ConfigService} from '@services/config/config.service';

import {FirebaseTokenResponseInterface} from '@interfaces/firebase/firebase-token-response.interface';
import {FirebaseRequestInterface} from '@interfaces/firebase/firebase-request.interface';

import {environment} from '@env/environment.prod';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRequestService implements FirebaseRequestInterface {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private configService: ConfigService,
    private httpClient: HttpClient,
    private statefulFirebaseService: StatefulFirebaseService,
  ) {
    this.url = `${environment.backendUrl}/firebase/customToken`;
  }

  private readonly url: string;

  getFirebaseToken(): Observable<HttpResponse<FirebaseTokenResponseInterface>> {
    return this.httpClient.get<FirebaseTokenResponseInterface>(
      this.url,
      {
        observe: 'response',
        headers: this.configService.getHeaders
      }
    ).pipe(
      map( res => {
        this.statefulFirebaseService.token = res.body.customToken;
        this.angularFireAuth.auth.signInWithCustomToken( res.body.customToken ).then();
        return res;
      })
    );
  }
}
