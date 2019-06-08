import { Injectable } from '@angular/core';
import {GTM} from '@interfaces/google-tag-manager/gtm';

@Injectable({
  providedIn: 'root'
})
export class GTMService {
  private gtm: GTM;
  constructor() { }

  trigger() {
    console.log(this.gtm);
    (<any>window).dataLayer.push(this.gtm);
  }

  set gtmData(gtm: GTM) {
    this.gtm = gtm;
  }

  get gtmData(): GTM {
    return  this.gtm;
  }
}
