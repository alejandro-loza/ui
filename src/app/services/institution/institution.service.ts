import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Response } from '@shared/dto/credentials/response';
import { FinerioService } from '../config/config.service';
import { FinancialInstitution } from '@shared/dto/credentials/financialInstitution';

@Injectable()
export class InstitutionService {

  institutions:FinancialInstitution [] = []

  constructor( private http:HttpClient, private finerio:FinerioService ) { 
    }

  getAllInstitutions() {
    return this.http.get(`${ environment.backendUrl }/institutions`, ({headers: this.finerio.getJsonHeaders() }))
                    .pipe( map( (res:any) => {
                      res.data.forEach(element => {
                        element.code != "DINERIO" ?  this.institutions.push( element ) : null
                      });
                      return res as Response
                      })
                    );
            
  }

}
