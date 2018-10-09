import { Injectable } from             '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from            '@env/environment';

import { FinerioService } from         '@services/config/config.service';
import { AuthService } from            '@services/auth/auth.service';

import { QueryMovements } from         '@classes/queryMovementsDto.class';
import { InfoUser } from '@interfaces/infoUser.interface';

@Injectable()
export class MovementsService {

  private headers: HttpHeaders;
  url = `${environment.backendUrl}/users`;
  id: string;
  token: string;
  queryMovements: QueryMovements = new QueryMovements( true, true, true, 35 );

  constructor(
    private httpClient: HttpClient,
    private finerioService: FinerioService
  ) {
    this.headers = new HttpHeaders();
  }

  allMovements () {
    this.id = sessionStorage.getItem('id-user');
    this.token = sessionStorage.getItem('access-token');
    const urlMovements =
      `${this.url}/` +
      `${this.id}/movements` +
      `?deep=${this.finerioService.deep}` +
      `&includeDeposits=${this.queryMovements.getDeposits}` +
      `&includeCharges=${this.queryMovements.getCharges}` +
      `&tmz=${this.queryMovements.getTmz}` +
      `&max=${this.queryMovements.getMovements}` +
      `&includeDuplicates=${this.queryMovements.getDuplicates}`;
    return this.httpClient.get(urlMovements, { headers: this.headers.set('Authorization', `Bearer ${this.token}`)});
  }
}
