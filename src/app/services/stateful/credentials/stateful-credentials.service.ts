import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulCredentialsService {
  private credential_list: CredentialInterface[];

  constructor() { }

  set credentials(credential_list: CredentialInterface[]) {
    this.credential_list = credential_list;
  }

  get credentials(): CredentialInterface[] {
    return this.credential_list;
  }
}
