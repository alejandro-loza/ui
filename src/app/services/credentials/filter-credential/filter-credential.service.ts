import { Injectable } from '@angular/core';
import {CredentialInterface} from '@interfaces/credential.interface';
import {StatefulCredentialsService} from '@stateful/credentials/stateful-credentials.service';
import {ToastService} from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class FilterCredentialService {

  constructor(
    private statefulCredentials: StatefulCredentialsService,
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

  firstMessage() {
    this.toastService.setCode = 200;
    this.toastService.setMessage = 'Estamos sincronizando con tu banca en línea,<br>esto puede tardar unos minutos.';
    this.toastService.toastGeneral();
  }


}
