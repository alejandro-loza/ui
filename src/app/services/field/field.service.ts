import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinancialInstitution } from '@shared/dto/credentials/financialInstitution';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { institutionField } from '@interfaces/institutionField';

@Injectable()
export class FieldService {

  endpoint = environment.backendUrl;
  institutionId:number;

  constructor( private http: HttpClient, private finero:ConfigService ) {
   }

  findAllFieldsByInstitution( institutionCode:string ) {
    let institutions = JSON.parse( sessionStorage.getItem("institutions") );
    institutions.forEach( (element:FinancialInstitution) => {
      element.code ==  institutionCode ? this.institutionId = element.id : null 
    });
    let url = `${ this.endpoint }/fields?institutionId=${ this.institutionId }`;
    return this.http.get( url, ({ headers: this.finero.getJsonHeaders() }) ).pipe(
      map( (res: institutionField[]) => {
        return res;
      })
    );
  }
}
