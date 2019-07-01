import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {environment} from '@env/environment';

import {ConfigService} from '@services/config/config.service';
import {StatefulInstitutionsService} from '@stateful/institutions/stateful-institutions.service';

import {InstitutionInterface} from '@interfaces/institution.interface';
import {Response} from '@interfaces/response.interface';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class InstitutionService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private statefulInstitutionsService: StatefulInstitutionsService
  ) {}

  getAllInstitutions(): Observable<HttpResponse<Response<InstitutionInterface>>> {
    return this.httpClient.get<Response<InstitutionInterface>>(
      `${environment.backendUrl}/institutions`,
      {
        observe: 'response',
        headers: this.configService.getHeaders
      }
    ).pipe(
      map(res => {
        this.statefulInstitutionsService.institutions = res.body.data;
        return res;
      })
    );
  }
}
