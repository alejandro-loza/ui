import {Injectable} from '@angular/core';
import {ConfigService} from '@services/config/config.service';
import {ToastInterface} from '@interfaces/toast.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private message: string;
  private classes: string;
  private button: string;
  private displayLength: number;

  constructor(private configService: ConfigService) {
    this.button = `<button
      class="btn-flat toast-action"
      onClick="
      const toastElement = document.querySelector('.toast');
      const toastInstance = M.Toast.getInstance(toastElement);
      toastInstance.dismiss();">
      <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right" />
    </button>`;
    this.displayLength = 2500;
  }

  /**
   * Es una función Toast genérico
   * @param { ToastInterface } toastParams - Por favor verífica tu conexión de internet Hemos actualizado tu sesión, ¡Bienvenido de nuevo!
   */
  toastGeneral(toastParams: ToastInterface) {
    switch (toastParams.code) {
      case 0:
        this.message = 'Por favor verífica tu conexión de internet';
        this.classes = 'cyan accent-4';
        break;
      case 200:
        this.message = toastParams.message;
        this.classes = 'grey darken-2 grey-text text-lighten-5';
        break;
      case 400:
        this.message = toastParams.message;
        this.classes = 'red accent-3';
        break;
      case 401:
        this.configService
          .refreshToken()
          .subscribe(
            res => res,
            err => console.error(toastParams.code, err),
            () => {}
          );
        this.message = 'Hemos actualizado tu sesión, ¡Bienvenido de nuevo!';
        this.classes = 'light-blue darken-4';
        break;
      case 4011:
        this.message =
          'Tus datos son incorrectos, por favor verifica<br>que los hayas escrito bien';
        this.classes = 'light-blue darken-4';
        break;
      case 422:
        this.message = toastParams.message;
        this.classes = 'red accent-3';
        break;
      case 500:
        this.message = toastParams.message;
        this.classes = 'red accent-3';
        break;
      default:
        this.message = toastParams.message;
        this.classes = toastParams.classes;
        break;
    }
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.message}</span>` + this.button,
      classes: this.classes,
      displayLength: this.displayLength
    });
  }
}
