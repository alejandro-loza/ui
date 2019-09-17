import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { FirebaseConfigInterface } from '@interfaces/firebase/firebase.config.interface';
import { FirebaseConfig } from '@app/constants/firebase/firebase-const';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  private readonly _config: FirebaseConfigInterface;
  private readonly _app: firebase.app.App;
  private readonly _auth: firebase.auth.Auth;
  private readonly _database: firebase.database.Database;

  constructor( ) {
    this._config = FirebaseConfig;
    this._app = firebase.initializeApp( this._config );
    this._auth = firebase.auth();
    this._database = firebase.database();
  }

  get auth(): firebase.auth.Auth {
    return this._auth;
  }


  get database(): firebase.database.Database {
    return this._database;
  }
}
