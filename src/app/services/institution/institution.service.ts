import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';

import {InstitutionInterface} from '@interfaces/institution.interface';
import {Response} from '@interfaces/response.interface';

import {Observable} from 'rxjs';

@Injectable()
export class InstitutionService {
  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAllInstitutions(): Observable<HttpResponse<Response<InstitutionInterface>>> {
    return this.http.get<Response<InstitutionInterface>>(
      `${environment.backendUrl}/institutions`,
      {
        observe: 'response',
        headers: this.finerio.getHeaders
      }
    );
  }
}
