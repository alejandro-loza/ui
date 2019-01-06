import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { InstitutionInterface } from '@interfaces/institution.interface';
import { InstitutionsInterface } from '@interfaces/Institutions.interface';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class InstitutionService {
  institutions: InstitutionInterface[] = [];

  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAllInstitutions(): Observable<HttpResponse<InstitutionsInterface>> {
    return this.http
      .get<InstitutionsInterface>(`${environment.backendUrl}/institutions`, {
        observe: 'response',
        headers: this.finerio.getJsonHeaders()
      })
      .pipe(
        map(res => {
          res.body.data.forEach(element => {
          element.code !== 'DINERIO' ? this.institutions.push(element) : null;
          });
          res.body.data = this.institutions;
          return res;
        })
      );
  }
}
