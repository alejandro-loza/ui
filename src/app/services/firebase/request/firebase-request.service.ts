import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {StatefulFirebaseService} from '@stateful/firebase/stateful-firebase.service';
import {ConfigService} from '@services/config/config.service';

import {FirebaseTokenResponseInterface} from '@interfaces/firebase/firebase-token-response.interface';
import {FirebaseRequestInterface} from '@interfaces/firebase/firebase-request.interface';

import {environment} from '@env/environment.prod';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirebaseConfigService} from '@services/firebase/config/firebase-config.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRequestService implements FirebaseRequestInterface {

  constructor(
    private configService: ConfigService,
    private firebaseConfigService: FirebaseConfigService,
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
        const auth = this.firebaseConfigService.auth.signInWithCustomToken( res.body.customToken );
        auth.then( firebase_res => console.log(firebase_res)).catch( error => console.error( 'Ocurrió un error', error ));
        return res;
      })
    );
  }
}
