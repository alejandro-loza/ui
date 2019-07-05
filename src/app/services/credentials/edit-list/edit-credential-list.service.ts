import { Injectable } from '@angular/core';

import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';

import {CredentialInterface} from '@interfaces/credential.interface';
import {CleanerService} from '@services/cleaner/cleaner.service';

@Injectable({
  providedIn: 'root'
})
export class EditCredentialListService {
  private credentials: CredentialInterface[];
  private credential: CredentialInterface;
  constructor(
    private statefulCredential: StatefulCredentialService,
    private statefulCredentials: StatefulCredentialsService,
    private cleaner: CleanerService,
  ) {
    this.credentials = this.statefulCredentials.credentials;
  }

  addCredential() {

    this.credential = this.statefulCredential.credential;

    this.credentials = [...this.credentials, this.credential];

    this.statefulCredentials.credentials = this.credentials;

  }

  deleteCredential() {

    this.credential = this.statefulCredential.credential;

    this.credentials = this.credentials.filter(credential => credential.id !== this.credential.id );

    this.statefulCredentials.credentials = this.credentials;

    this.cleaner.cleanMovements();

    this.cleaner.cleanBudgetsVariables();

    this.cleaner.cleanDashboardVariables();

  }
}
