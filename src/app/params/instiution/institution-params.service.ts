import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigParamsService } from '../config/config-params.service';
import {isNullOrUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class InstitutionParamsService extends ConfigParamsService {
  private paramsInstitution: HttpParams;
  constructor() {
    super();
    this.paramsInstitution = new HttpParams();
    this.paramsInstitution = this.getConfigParams;
  }

  set setInstitutionID( id: string) {
    if( !isNullOrUndefined(id) || id !== '' ) {
      this.paramsInstitution = this.paramsInstitution.set('institutionId', id);
    }
  }

  get getInstitutionParams(): HttpParams {
    return this.paramsInstitution;
  }
}
