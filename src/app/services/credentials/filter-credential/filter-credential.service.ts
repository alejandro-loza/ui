import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';

@Injectable({
  providedIn: 'root'
})
export class FilterCredentialService {

  constructor(
    private statefulCredentials: StatefulCredentialsService,

  ) { }

  get filterCredentials(): CredentialInterface[] {

    if (this.statefulCredentials.credentials && this.statefulCredentials.credentials.length > 0) {

      const credentials = this.statefulCredentials.credentials;

      return credentials.filter( credential =>

        credential.status === 'VALIDATE' || credential.status === 'ACTIVE'
      );
    }

  }

}
