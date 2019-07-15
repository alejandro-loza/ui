import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulCredentialService {

  private _credential: CredentialInterface;

  constructor() { }

  set credential(credential: CredentialInterface) {
    this._credential = credential;
  }

  get credential(): CredentialInterface {
    return this._credential;
  }
}
