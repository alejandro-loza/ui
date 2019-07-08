import { Injectable } from '@angular/core';
import {InstitutionInterface} from '@interfaces/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulInstitutionService {

  private _institution: InstitutionInterface;

  constructor() { }

  set institution(institution: InstitutionInterface) {
    this._institution = institution;
  }

  get institution(): InstitutionInterface {
    return  this._institution;
  }
}
