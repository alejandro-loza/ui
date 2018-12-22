import { Injectable } from    '@angular/core';
import { ConfigService } from '@services/config/config.service';
import * as M from            'materialize-css/dist/js/materialize';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message: string;
  classes: string;
  button: string;
  displayLength: number;

  constructor(
    private configService: ConfigService
  ) {
    this.button = `<button
      class="btn-flat toast-action"
      onClick="
      const toastElement = document.querySelector('.toast');
      const toastInstance = M.Toast.getInstance(toastElement);
      toastInstance.dismiss();">
      <i class="mdi mdi-24px mdi-close grey-text text-lighten-4 right"><i/>
    </button>`;
    this.displayLength = 2500;
  }

  /**
   * @function setMessage() - Está función sirve para poder enviar el mensaje en el toast
   * @param message - El parametro sirve poder enviar el mensaje de error en caso de que venga
   * en la respuesta. Caso contrario se le asignará un por definido
   *
   * Ej de uso del servicio:
   *
   * this.toastService.setMessage = '_Aquí_ _va_ _el_ _mensaje_';
   */
  public set setMessage(message: string) {
    this.message = message;
  }

  public set setClasses( classes: string ) {
    this.classes = classes;
  }

  public set setDisplayLength( displayLength: number ) {
    this.displayLength = displayLength;
  }

  /**
   * @function toastCode0 - Está función es principalmente para el error de conexión ya que es el único que regresa un status 0
   * No es necesario usar @function setMessage()
   */
  toastCode0() {
    M.Toast.dismissAll();
    this.setMessage = 'Por favor verífica tu conexión de internet';
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'cyan accent-4',
      displayLength: this.displayLength
    });
  }

  /**
   * @function toastCode200 - Está función es principalmente para un code 200.
   * Se debe usar la @function setMessage() - para enviar el mensaje en la función
   */
  toastCode200() {
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'grey darken-2 grey-text text-lighten-5',
      displayLength: this.displayLength
    });
  }

  /**
   * @function toastCode400 - Está función es principalmente para errores con code 400.
   * Se debe usar la @function setMessage() - para enviar el mensaje en la función
   */
  toastCode400() {
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'red accent-3',
      displayLength: this.displayLength
    });
  }

  /**
   * @function toastCode401 - Está función es principalmente para el refresh Token.
   * No se debe usar la @function setMessage()
   */
  toastCode401() {
    M.Toast.dismissAll();
    this.setMessage = 'Hemos actualizado tu sesión, ¡Bienvenido de nuevo!';
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'light-blue darken-4',
      displayLength: this.displayLength
    });
    this.configService.refreshToken();
  }

  /**
   * @function toastCode500 - Está función es principalmente para errores con code 400.
   * No se debe usar la @function setMessage() - para enviar el mensaje, ya que se
   * ocupo para errores del servidor. Así que se envia un mensaje por default. En caso
   * de querer enviar un mensaje personalizado, ocupa la @function toastCode500Custom()
   */
  toastCode500() {
    M.Toast.dismissAll();
    this.setMessage = 'Ocurrió un error al querer completar la acción';
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'red accent-3',
      displayLength: this.displayLength
    });
  }

  /**
   * @function toastCode500Custom - Está función es principalmente para errores con code 500.
   * Puedes enviar un mensaje personalizado al usuario con @function setMessage(),
   * aunque no es recomendable. Ya que son errores del servidor.
   * Si no quieres enviar ocupa @function toastCode500()
   */
  toastCode500Custom() {
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: 'red accent-3',
      displayLength: this.displayLength
    });
  }

  /**
   * Puedes crear tu propio Toast, debes ocupar
   * @function setMessage(),
   * @function setClasses(),
   * @function setDisplayLength(),
   * para poder ocupar esta función
   */
  toastCustom() {
    M.Toast.dismissAll();
    M.toast({
      html: `<span>${this.message}</span` + this.button,
      classes: this.classes,
      displayLength: this.displayLength
    });
  }
}
