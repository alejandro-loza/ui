import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { InstitutionsInterface } from '@interfaces/Institutions.interface';

import { Observable } from 'rxjs';

@Injectable()
export class InstitutionService {
  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAllInstitutions(): Observable<HttpResponse<InstitutionsInterface>> {
    return this.http.get<InstitutionsInterface>(
      `${environment.backendUrl}/institutions`,
      {
        observe: 'response',
        headers: this.finerio.getJsonHeaders()
      }
    );
  }
}
