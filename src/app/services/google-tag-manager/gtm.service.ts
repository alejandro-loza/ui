import { Injectable } from '@angular/core';
import {GTM} from '@interfaces/google-tag-manager/gtm';

@Injectable({
  providedIn: 'root'
})
export class GTMService {
  private gtm: GTM;
  constructor() { }

  trigger() {
    (<any>window).dataLayer.push(this.gtm);
  }

  set gtmData(gtm: GTM) {
    this.gtm = gtm;
  }

  get gtmData(): GTM {
    return  this.gtm;
  }

  create_UUID() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
