import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { InstitutionInterface } from '@interfaces/institution.interface';
import { InstitutionFieldInterface } from '@interfaces/institutionField';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FieldService {
  endpoint = environment.backendUrl;
  institutionId: number;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  findAllFieldsByInstitution( institutionCode: string ): Observable<HttpResponse<InstitutionFieldInterface[]>> {
    const institutions = JSON.parse(sessionStorage.getItem('institutions'));
    institutions.forEach((element: InstitutionInterface) => {
      element.code === institutionCode
        ? (this.institutionId = element.id)
        : null;
    });
    const url = `${this.endpoint}/fields?institutionId=${this.institutionId}`;
    return this.httpClient
      .get<InstitutionFieldInterface[]>(url, {
        observe: 'response',
        headers: this.configService.getJsonHeaders()
      });
  }
}
