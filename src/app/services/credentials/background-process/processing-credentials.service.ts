import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {CredentialInterface} from '@interfaces/credential.interface';
import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {asyncScheduler, BehaviorSubject, concat, of, scheduled} from 'rxjs';
import {concatMap, delay, map, skip, tap} from 'rxjs/operators';
import {ToastService} from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessingCredentialsService {
  private credentials: CredentialInterface[];
  private load = new BehaviorSubject('');
  constructor(
    private credentialsService: CredentialService,
    private dateApiService: DateApiService,
    private statefulCredentialsService: StatefulCredentialsService,
    private toastService: ToastService
  ) { }

  checkCredentials() {
    if (this.statefulCredentialsService.getCredentials && this.statefulCredentialsService.getCredentials.length > 0) {
      this.firstMessage();
      this.credentials = this.statefulCredentialsService.getCredentials;
      this.credentials = this.credentials.filter( credential =>
        credential.status === 'VALIDATE' ||
        credential.status === 'ACTIVE' &&
        credential.institution.code.toLowerCase() !== 'bbva'
      );
      this.updateCredentials(this.credentials);
      this.lastMessage();
    } else {
      this.getAllCredential();
    }
  }

  getAllCredential() {
    this.credentialsService.getAllCredentials().subscribe(
      () => {}, err => err, () => this.checkCredentials()
    );
  }

  updateCredentials(credential_list: CredentialInterface[]) {
    this.credentials = credential_list.map(credential => {
        if ( this.isMoreThanEightHours(credential.lastUpdated) ) {
          this.credentialsService.updateCredential(credential).subscribe(
            res => res,
            err => err,
            () => {
              this.checkCredentialStatus(credential);
            }
          );
        }
        return credential;
      }
    );
  }

  checkCredentialStatus(credential: CredentialInterface) {
    const getCredential = this.credentialsService.getCredential(credential.id);
    const whenToRefresh = scheduled(of(''), asyncScheduler).pipe(
      delay(4000),
      tap(() => this.load.next('')),
      skip(4),
    );
    const poll = concat(getCredential, whenToRefresh);
    const polledCredential = this.load.pipe(
      concatMap(() => poll),
      map( (res: HttpResponse<CredentialInterface>) => {
        if (res.body.status === 'ACTIVE' || res.body.status === 'INVALID') {
          unpolledCredential.unsubscribe();
          this.showToast(res.body);
          return res;
        }
      })
    );
    const unpolledCredential = polledCredential.subscribe();
  }

  isMoreThanEightHours(credential_lastUpdated: string): boolean {
    const currentDate = new Date();
    const auxCredentialDate = this.dateApiService.formatDateForAllBrowsers(credential_lastUpdated);
    const timeline = (currentDate.getTime() - auxCredentialDate.getTime()) / (1000 * 60 * 60);
    return timeline >= 8;
  }

  showToast(credential: CredentialInterface) {
    this.toastService.setCode = 200;
    this.toastService.setMessage =
      credential.status === 'ACTIVE' ?
        `Tu cuenta de ${credential.institution.name},<br>ha sido sincronizada` :
        `¡Hubo un problema con tu cuenta de ${credential.institution.name}, revísala!`;
    this.toastService.toastGeneral();
  }

  firstMessage() {
    this.toastService.setCode = 200;
    this.toastService.setMessage = 'Estamos sincronizando con tu banca en línea,<br>esto puede tardar unos minutos.';
    this.toastService.toastGeneral();
  }

  lastMessage() {
    setTimeout(() => {
      this.toastService.setCode = 200;
      this.toastService.setMessage = 'Hemos sincronizado tus cuentas exitosamente';
      this.toastService.toastGeneral();
    }, 3000);
  }
}
