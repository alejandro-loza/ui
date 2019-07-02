import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';

import {CredentialInterface} from '@interfaces/credential.interface';

import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';

import {asyncScheduler, BehaviorSubject, concat, Observable, of, scheduled, Subscription} from 'rxjs';
import {concatMap, delay, map, share, skip, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessingCredentialsService {

  private load = new BehaviorSubject('');

  constructor(

    private credentialsService: CredentialService,
    private cleanerService: CleanerService,
    private dateApiService: DateApiService,
    private statefulCredentials: StatefulCredentialsService,
    private statefulCredential: StatefulCredentialService,
    private toastService: ToastService

  ) { }

  get filterCredentials(): CredentialInterface[] {

    if (this.statefulCredentials.credentials && this.statefulCredentials.credentials.length > 0) {

      this.firstMessage();

      const credentials = this.statefulCredentials.credentials;

      return credentials.filter( credential =>

        credential.status === 'VALIDATE' || credential.status === 'ACTIVE' &&

        credential.institution.code !== 'BBVA'

      );
    }

  }

  updateCredential( credential: CredentialInterface ) {

    if ( this.dateApiService.hasMoreThanEightHours(credential.lastUpdated) ) {

      this.credentialsService.updateCredential(credential).subscribe(
        res => this.statefulCredential.credential = res.body,
        err => err,
        () => {
          const unpolledCredential = this.checkCredentialStatus()
            .subscribe(
              res => this.unsubscribeFromProcessing(res.body, unpolledCredential)
            );
        }
      );
    }
  }

  checkCredentialStatus(): Observable<HttpResponse<CredentialInterface>> {

    const getCredential = this.credentialsService.getCredential(this.statefulCredential.credential.id);

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

  unsubscribeFromProcessing( credential: CredentialInterface, subscription: Subscription) {

    if ( credential.status === 'ACTIVE' || credential.status === 'INVALID' ) {

      this.showToast(credential);
      subscription.unsubscribe();

    }

  }

  showToast( credential: CredentialInterface ) {

    this.toastService.setCode = 200;

    if ( credential.status === 'ACTIVE' ) {

      this.cleanerService.cleanBudgetsVariables();
      this.cleanerService.cleanDashboardVariables();
      this.cleanerService.cleanMovements();

      this.toastService.setMessage = `Tu cuenta de ${ credential.institution.name },<br>ha sido sincronizada`;

    } else {

      this.toastService.setMessage = `¡Hubo un problema con tu cuenta de ${ credential.institution.name }, revísala!`;

    }

    setTimeout(() => this.toastService.toastGeneral(), 2000);

  }

  firstMessage() {
    this.toastService.setCode = 200;
    this.toastService.setMessage = 'Estamos sincronizando con tu banca en línea,<br>esto puede tardar unos minutos.';
    this.toastService.toastGeneral();
  }
}
