import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {CredentialService} from '@services/credentials/credential.service';
import {ToastPollingService} from '@services/toast/credential/toast-polling/toast-polling.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {asyncScheduler, BehaviorSubject, concat, Observable, of, scheduled, Subscription} from 'rxjs';
import {concatMap, delay, map, share, skip, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PollingCredentialService {

  private load = new BehaviorSubject('');

  constructor(
    private credentialService: CredentialService,
    private toastPollingService: ToastPollingService,
  ) { }

  checkCredentialStatus(credential: CredentialInterface): Observable<HttpResponse<CredentialInterface>> {

    const getCredential = this.credentialService.getCredential(credential.id);

    const whenToRefresh = scheduled(of(''), asyncScheduler).pipe(
      delay(4000),
      tap(() => this.load.next('')),
      skip(4),
    );

    const poll = concat(getCredential, whenToRefresh);

    return this.load.pipe(

      share(),

      concatMap(() => poll),

      map( ( res: HttpResponse <CredentialInterface> ) => res )

    );
  }

  unsubscribeFromProcessing( credential: CredentialInterface, subscription: Subscription): boolean {
    return this.toastPollingService.showToast(credential, subscription);
  }

}
