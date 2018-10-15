import { Injectable } from             '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FinerioService } from         '@services/config/config.service';

import { environment } from            '@env/environment';

import { map } from                    'rxjs/operators';

import { QueryMovements } from         '@classes/queryMovementsDto.class';

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
    let offset = 0;
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
      `&includeDuplicates=${this.queryMovements.getDuplicates}` +
      `&offset=`+ offset;
      offset = offset + this.queryMovements.getMovements + 1;
    return this.httpClient.get(
             urlMovements,
             { headers: this.headers.set('Authorization', `Bearer ${this.token}`)}
           ).pipe(map( res => res ));
  }
}
