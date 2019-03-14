import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigParamsService } from '../config/config-params.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutionParamsService extends ConfigParamsService {
  private paramsInstitution: HttpParams;
  constructor() {
    super();
    this.paramsInstitution = this.getParams;
    this.paramsInstitution.append('institutionId', null);
  }

  get getParams(): HttpParams {
    return this.paramsInstitution;
  }
}
