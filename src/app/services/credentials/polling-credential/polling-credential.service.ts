import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {CredentialService} from '@services/credentials/credential.service';
import {ToastService} from '@services/toast/toast.service';
import {StatefulCredentialService} from '@stateful/credential/stateful-credential.service';
import {CleanerService} from '@services/cleaner/cleaner.service';

import {CredentialInterface} from '@interfaces/credential.interface';

import {asyncScheduler, BehaviorSubject, concat, Observable, of, scheduled, Subscription} from 'rxjs';
import {concatMap, delay, map, share, skip, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollingCredentialService {

  private load = new BehaviorSubject('');

  constructor(
    private cleanerService: CleanerService,
    private credentialService: CredentialService,
    private statefulCredential: StatefulCredentialService,
    private toastService: ToastService,
  ) { }

  checkCredentialStatus(): Observable<HttpResponse<CredentialInterface>> {

    const getCredential = this.credentialService.getCredential(this.statefulCredential.credential.id);

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

}
