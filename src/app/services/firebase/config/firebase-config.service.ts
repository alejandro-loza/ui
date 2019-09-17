import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

import { FirebaseConfigInterface } from '@interfaces/firebase/firebase.config.interface';
import { FirebaseConfig } from '@app/constants/firebase/firebase-const';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  private readonly firebaseConfig: FirebaseConfigInterface;
  private readonly firebaseApp: firebase.app.App;
  private readonly firebaseAuth: firebase.auth.Auth;
  private readonly firebaseDatabase: firebase.database.Database;

  constructor( ) {
    this.firebaseConfig = FirebaseConfig;
    this.firebaseApp = firebase.initializeApp( this.firebaseConfig );
    this.firebaseAuth = firebase.auth();
    this.firebaseDatabase = firebase.database();
  }
}
