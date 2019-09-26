import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credentials/credential.interface';
import {Subscription} from 'rxjs';
import {ModalTokenComponent} from '@components/modal-token/component/modal-token.component';
import {TrackingCredentialService} from '@services/credentials/tracking-credential/tracking-credential.service';
import {ToastService} from '@services/toast/toast.service';
import {CleanerService} from '@services/cleaner/cleaner.service';
import {AccountService} from '@services/account/account.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {InteractiveFieldService} from '@services/interactive-field/interactive-field.service';
import {finalize} from 'rxjs/operators';
import {isUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ToastPollingService {
  dialogRef: MatDialogRef<ModalTokenComponent>;

  constructor(
    private accountService:                 AccountService,
    private cleanerService:                 CleanerService,
    private interactiveFieldsService:       InteractiveFieldService,
    public matDialog:                       MatDialog,
    private toastService:                   ToastService,
    private trackingCredentialService:      TrackingCredentialService,
  ) { }

  showToast( credential: CredentialInterface, subscription: Subscription ): boolean {
    const auxCredential = credential;

    this.toastService.setCode = 200;

    if ( credential.status === 'ACTIVE' ) {

      this.accountService.getAccounts().subscribe();

      this.cleanerService.cleanAllVariables();

      this.toastService.setMessage = `Tu cuenta de ${ credential.institution.name },<br>ha sido sincronizada`;

      this.toastService.toastGeneral();

      subscription.unsubscribe();

    } else if ( credential.status === 'TOKEN' ) {

      if ( !isUndefined(this.dialogRef) ) { return ; }

      this.dialogRef = this.matDialog.open(ModalTokenComponent, {
        autoFocus: true,
        disableClose: true,
        width: '750px',
        data: credential
      });

      this.dialogRef.afterClosed().pipe(
        finalize( () => this.dialogRef = undefined )
      );

      this.toastService.setMessage = `¡Necesitamos información extra de tu cuenta bancaria<br>para sincronizarla`;

      this.toastService.toastGeneral();

    } else if ( credential.status === 'INVALID' ) {

      this.toastService.setMessage = `¡Hubo un problema con tu cuenta de ${ credential.institution.name }, revísala!`;

      this.toastService.toastGeneral();

      subscription.unsubscribe();

    }

    this.trackingCredentialService.syncingCredential(credential);

    return subscription.closed;

  }
}
