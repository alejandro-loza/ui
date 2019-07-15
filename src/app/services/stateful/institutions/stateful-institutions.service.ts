import { Injectable } from '@angular/core';
import {InstitutionInterface} from '@interfaces/institution.interface';

@Injectable({
  providedIn: 'root'
})
export class StatefulInstitutionsService {
  private institution_list: InstitutionInterface[];
  constructor() { }

  set institutions(institution_list: InstitutionInterface[]) {
    this.institution_list = institution_list;
  }

  get institutions(): InstitutionInterface[] {
    return  this.institution_list;
  }
}
