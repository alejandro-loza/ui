import { Injectable } from '@angular/core';
import {StatefulCredentialsService} from '@services/stateful/credentials/stateful-credentials.service';
import {CredentialInterface} from '@interfaces/credential.interface';
import {CredentialService} from '@services/credentials/credential.service';
import {DateApiService} from '@services/date-api/date-api.service';
import {asapScheduler, BehaviorSubject, concat, Observable, of, scheduled} from 'rxjs';
import {concatMap, delay, map, skip, tap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessingCredentialsService {
  private credentials: CredentialInterface[];
  private auxCredentialList: CredentialInterface[];
  private load = new BehaviorSubject('');
  constructor(
    private credentialsService: CredentialService,
    private dateApiService: DateApiService,
    private statefulCredentialsService: StatefulCredentialsService
  ) {
    this.auxCredentialList = [];
  }

  checkCredentials() {
    if (this.statefulCredentialsService.getCredentials) {
      this.credentials = this.statefulCredentialsService.getCredentials;
      this.credentials = this.credentials.filter( credential =>
        credential.status === 'VALIDATE' ||
        credential.status === 'ACTIVE' &&
        credential.institution.code.toLowerCase() !== 'bbva'
      );
      this.updateCredentials(this.credentials);
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
    this.auxCredentialList = credential_list.map(credential => {
        if ( this.isMoreThanEightHours(credential.lastUpdated) ) {
          console.log(`Tiene más de ocho horas`);
          // this.credentialsService.updateCredential(credential).subscribe();
        }
        this.checkCredentialStatus(credential);
        return credential;
      }
    );
  }

  checkCredentialStatus(credential: CredentialInterface) {
    const getCredential = this.credentialsService.getCredential(credential.id);
    const whenToRefresh = scheduled(of(''), asapScheduler).pipe(
      delay(4000),
      tap(() => this.load.next('')),
      skip(1),
    );
    const poll = concat(getCredential, whenToRefresh);
    const polledCredential$ = this.load.pipe(
      concatMap(() => poll),
      map( (res: HttpResponse<CredentialInterface>) => {
        if (res.body.status === 'ACTIVE') {
          return res;
        }
      })
    );
    polledCredential$.subscribe();
  }

  isMoreThanEightHours(credential_lastUpdated: string): boolean {
    const currentDate = new Date();
    const auxCredentialDate = this.dateApiService.formatDateForAllBrowsers(credential_lastUpdated);
    const timeline = (currentDate.getTime() - auxCredentialDate.getTime()) / (1000 * 60 * 60);
    return timeline >= 8;
  }

}
