import { Injectable } from '@angular/core';
import { ConfigService } from '@services/config/config.service';
import { ToastInterface } from '@interfaces/toast.interface';

import * as M from 'materialize-css/dist/js/materialize';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast: ToastInterface;
  private readonly button: string;
  private displayLength: number;

  constructor(private configService: ConfigService) {
    this.toast = {};
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
  toastGeneral() {
    switch (this.toast.code) {
      case 0:
        this.toast = {
          message: 'Por favor verífica tu conexión de internet',
          classes: 'cyan accent-4'
        };
        break;
      case 200:
        this.toast.classes = 'grey darken-2 grey-text text-lighten-5';
        break;
      case 201:
        this.toast.classes = 'grey darken-2 grey-text text-lighten-5';
        break;
      case 400:
        this.toast.classes = 'red accent-3';
        break;
      case 401:
        this.toast = {
          message: 'Hemos actualizado tu sesión, ¡Bienvenido de nuevo!',
          classes: 'light-blue darken-4'
        };
        break;
      case 4011:
        this.toast = {
          message: 'Tus datos son incorrectos, por favor verifica <br> que los hayas escrito bien',
          classes: 'light-blue darken-4'
        };
        break;
      case 422:
        this.toast.classes = 'red accent-3';
        break;
      case 500:
        this.toast.classes = 'red accent-3';
        break;
      default:
        break;
    }
    if (this.toast.displayLenght) {
      this.displayLength = this.toast.displayLenght;
    } else {
      this.displayLength = 2500;
    }
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.toast.message}</span>` + this.button,
      classes: this.toast.classes,
      displayLength: this.displayLength
    });
  }

  set setCode(code: number) {
    this.toast.code = code;
  }

  set setMessage(message: string) {
    this.toast.message = message;
  }

  set setClasses(classes: string) {
    this.toast.classes = classes;
  }

  set setDisplayLength(length: number) {
    this.toast.displayLenght = length;
  }
}
