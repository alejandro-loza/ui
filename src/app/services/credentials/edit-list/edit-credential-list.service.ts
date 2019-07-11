import { Injectable } from '@angular/core';

import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {CleanerService} from '@services/cleaner/cleaner.service';
import {AccountService} from '@services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class EditCredentialListService {
  private credentials: CredentialInterface[];
  private credential: CredentialInterface;
  constructor(
    private accountService: AccountService,
    private cleanerService: CleanerService,
    private statefulCredential: StatefulCredentialService,
    private statefulCredentials: StatefulCredentialsService,
  ) { }

  addCredential() {

    this.getData();


    this.credentials = [...this.credentials, this.credential];

    this.cleanData();

  }

  deleteCredential() {

    this.getData();

    this.credentials = this.credentials.filter(credential => credential.id !== this.credential.id );

    this.cleanData();

  }

  updateCredential() {

    this.getData();

    this.credentials = this.credentials.map( credential => {

      if ( credential.id === this.credential.id ) {

        credential = {...this.credential};

      }

      return credential;

    });

    this.cleanData();

  }

  private getData() {

    this.accountService.getAccounts().subscribe();

    this.credential = this.statefulCredential.credential;

    this.credentials = this.statefulCredentials.credentials;

  }

  private cleanData() {

    this.cleanerService.cleanDashboardVariables();
    this.cleanerService.cleanBudgetsVariables();
    this.cleanerService.cleanMovements();

    this.statefulCredentials.credentials = this.credentials;

  }

}
