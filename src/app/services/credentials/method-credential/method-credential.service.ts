import { Injectable } from '@angular/core';

import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {PollingCredentialService} from '@services/credentials/polling-credential/polling-credential.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

import {CreateCredentialInterface} from '@interfaces/credentials/createCredential.interface';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {TrackingCredentialService} from '@services/credentials/tracking-credential/tracking-credential.service';
import {CheckDataCredentialService} from '@services/credentials/check-data/check-data-credential.service';
import {CredentialUpdateResponse} from '@interfaces/credentials/credential-update-response';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodCredentialService implements CredentialUpdateResponse{
  constructor(
    private credentialsService: CredentialService,
    private dateApiService: DateApiService,
    private checkDataCredentialService: CheckDataCredentialService,
    private pollingCredentialService: PollingCredentialService,
    private statefulCredentialService: StatefulCredentialService,
    private trackingCredentialService: TrackingCredentialService,
  ) { }

  updateCredential( credential: CredentialInterface ) {

    if ( this.dateApiService.hasMoreThanEightHours(credential.lastUpdated) ) {

      this.credentialsService.updateCredential(credential).subscribe(

        res => {

          if (credential.password) {

            this.trackingCredentialService.editCredential(res.body);

          }

          this.checkDataCredentialService.checkData(res.body, this);

        });
    }

  }

  createCredential(credential: CreateCredentialInterface) {

    this.credentialsService.createCredential(credential).subscribe(
      res => {
        this.trackingCredentialService.createCredential(res.body);
        this.checkDataCredentialService.checkData(res.body, this);
      },
    );

  }

  checkCredentialSyncing(credential: CredentialInterface, subscription: Subscription) {
    this.pollingCredentialService.unsubscribeFromProcessing(credential, subscription);
  }
}
