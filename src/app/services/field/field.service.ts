import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinancialInstitution } from '@shared/dto/credentials/financialInstitution';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';
import { FinerioService } from '../config/config.service';

@Injectable()
export class FieldService {

  endpoint = environment.backendUrl;

  constructor( private http: HttpClient, private finero:FinerioService ) {
   }

  findAllByInstitution( institution ) {
    let url = `${ this.endpoint }/fields?institutionId=${ institution }`;
    return this.http.get( url, ({ headers: this.finero.getJsonHeaders() }) ).pipe(
      map( res => {
        return res;
      })
    );
  }


}
