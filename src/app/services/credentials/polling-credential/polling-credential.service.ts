import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

import {CredentialService} from '@services/credentials/credential.service';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';
import {TrackingCredentialService} from '@services/credentials/tracking-credential/tracking-credential.service';
import {InteractiveFieldService} from '@services/interactive-field/interactive-field.service';

import {CredentialInterface} from '@interfaces/credentials/credential.interface';

import {asyncScheduler, BehaviorSubject, concat, Observable, of, scheduled, Subscription} from 'rxjs';
import {concatMap, delay, map, share, skip, tap} from 'rxjs/operators';

import {ModalTokenComponent} from '@components/modal-token/component/modal-token.component';
import {MatDialog} from '@angular/material';
import {AccountService} from '@services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PollingCredentialService {

  private load = new BehaviorSubject('');

  constructor(
    private accountService: AccountService,
    private cleanerService: CleanerService,
    private credentialService: CredentialService,
    private interactiveFieldsService: InteractiveFieldService,
    private trackingCredentialService: TrackingCredentialService,
    private toastService: ToastService,
    private matDialog: MatDialog,
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

    if ( credential.status === 'ACTIVE' || credential.status === 'INVALID') {

      this.showToast(credential);
      subscription.unsubscribe();

      this.accountService.getAccounts().subscribe();

    } else if ( credential.status === 'TOKEN' ) {

      this.showToast(credential);
      this.interactiveFieldsService.findAllFields(credential).subscribe(res => console.log(res));
      this.matDialog.open(ModalTokenComponent, {
        width: '750px'
      });

    }

    this.trackingCredentialService.syncingCredential(credential);

    return subscription.closed;
  }

  showToast( credential: CredentialInterface ) {

    this.toastService.setCode = 200;

    if ( credential.status === 'ACTIVE' ) {

      this.cleanerService.cleanBudgetsVariables();
      this.cleanerService.cleanDashboardVariables();
      this.cleanerService.cleanMovements();

      this.toastService.setMessage = `Tu cuenta de ${ credential.institution.name },<br>ha sido sincronizada`;

    } else if ( credential.status === 'TOKEN' ) {
      this.toastService.setMessage = `¡Necesitamos información extra de tu cuenta bancaria<br>para sincronizarla`;
    } else {

      this.toastService.setMessage = `¡Hubo un problema con tu cuenta de ${ credential.institution.name }, revísala!`;

    }

    setTimeout(() => this.toastService.toastGeneral(), 2000);

  }

}
