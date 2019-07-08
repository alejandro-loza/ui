import { Injectable } from '@angular/core';

import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

import {CreateCredentialInterface} from '@interfaces/createCredential.interface';
import {CredentialInterface} from '@interfaces/credential.interface';
import {TrackingCredentialService} from '@services/credentials/tracking-credential/tracking-credential.service';

@Injectable({
  providedIn: 'root'
})
export class MethodCredentialService {
  constructor(
    private credentialsService: CredentialService,
    private dateApiService: DateApiService,
    private pollingCredential: PollingCredentialService,
    private statefulCredential: StatefulCredentialService,
    private trackingCredential: TrackingCredentialService,
  ) { }

  updateCredential( credential: CredentialInterface ) {

    if ( this.dateApiService.hasMoreThanEightHours(credential.lastUpdated) ) {

      this.credentialsService.updateCredential(credential).subscribe(
        res => {
          if (credential.password) {
            this.trackingCredential.editCredential(res.body);
          }
          this.createSubscription(res.body);
        }
      );

    }

  }

  createCredential(credential: CreateCredentialInterface) {

    this.credentialsService.createCredential(credential).subscribe(
      res => {
        this.trackingCredential.createCredential(res.body);
        this.createSubscription(res.body);

      },
    );

  }

  private createSubscription( credential: CredentialInterface ) {
    const unpolledCredential = this.pollingCredential.checkCredentialStatus( credential ).subscribe(
      res => this.pollingCredential.unsubscribeFromProcessing(res.body, unpolledCredential)
    );
  }
}
