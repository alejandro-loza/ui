import { Injectable } from '@angular/core';

import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

import {CreateCredentialInterface} from '@interfaces/createCredential.interface';
import {CredentialInterface} from '@interfaces/credential.interface';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodCredentialService {
  constructor(
    private credentialsService: CredentialService,
    private dateApiService: DateApiService,
    private pollingCredential: PollingCredentialService,
    private statefulCredential: StatefulCredentialService,
  ) { }

  updateCredential( credential: CredentialInterface ) {

    if ( this.dateApiService.hasMoreThanEightHours(credential.lastUpdated) ) {

      this.credentialsService.updateCredential(credential).subscribe(
        res => this.createSubscription(res.body)
      );
    }

  }

  createCredential(credential: CreateCredentialInterface) {
    this.credentialsService.createCredential(credential).subscribe(
      res => this.createSubscription(res.body),
    );
  }

  private createSubscription( credential: CredentialInterface ) {
    this.statefulCredential.credential = credential;
    const unpolledCredential = this.pollingCredential.checkCredentialStatus().subscribe(
      res => this.pollingCredential.unsubscribeFromProcessing(res.body, unpolledCredential)
    );
  }
}
