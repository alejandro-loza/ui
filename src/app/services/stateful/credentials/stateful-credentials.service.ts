import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credential.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulCredentialsService {
  private credentialList: CredentialInterface[];

  constructor() { }

  set setCredentials(credentials: CredentialInterface[]) {
    this.credentialList = credentials;
  }

  get getCredentials(): CredentialInterface[] {
    return this.credentialList;
  }
}
