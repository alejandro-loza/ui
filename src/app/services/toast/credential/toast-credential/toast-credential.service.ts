import { Injectable } from '@angular/core';
import {ToastService} from '@services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ToastCredentialService {

  constructor(
    private toastService: ToastService
  ) { }


  firstMessage() {
    this.toastService.setCode = 200;
    this.toastService.setMessage = 'Estamos sincronizando con tu banca en línea,<br>esto puede tardar unos minutos.';
    this.toastService.toastGeneral();
  }
}
