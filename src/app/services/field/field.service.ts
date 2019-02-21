import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';
import { CredentialBeanService } from '@services/credentials/credential-bean.service';
import { InstitutionService } from '@services/institution/institution.service';

import { InstitutionInterface } from '@interfaces/institution.interface';
import { InstitutionFieldInterface } from '@interfaces/institutionField';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FieldService {
  endpoint = environment.backendUrl;
  institutionId: number;
  institutions:InstitutionInterface[] = [];

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private credentialBean:CredentialBeanService,
    private institutionService:InstitutionService
  ) {}

  findAllFieldsByInstitution( institutionCode: string ): Observable<HttpResponse<InstitutionFieldInterface[]>> {
    if( this.credentialBean.getLoadInformation() ){
      this.loadInstitutions();
    } 
    const institutions = this.credentialBean.getInstitutions();
    if( institutions.length > 0 ){
      institutions.forEach((element: InstitutionInterface) => {
        if ( element.code === institutionCode ) {
          this.institutionId = element.id;
        }
      });
      const url = `${this.endpoint}/fields?institutionId=${this.institutionId}`;
      return this.httpClient
        .get<InstitutionFieldInterface[]>(url, {
          observe: 'response',
          headers: this.configService.getJsonHeaders()
        }).pipe (map(res => {
          return res;
        }));
    } 
  }

  loadInstitutions() {
    this.institutionService.getAllInstitutions().subscribe(res => {
      res.body.data.forEach( institution => {
        if (institution.code !== 'DINERIO') {
          this.institutions.push(institution);
        }
      });
      this.credentialBean.setInstitutions( this.institutions );
    });
  }
}
