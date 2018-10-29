import { Injectable } from             '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from            '@env/environment';
import { QueryMovements } from         '@classes/queryMovementsDto.class';
import { Movement } from '@app/shared/interfaces/movements.interface';

@Injectable()
export class MovementsService {

  private headers: HttpHeaders;
  private url = `${environment.backendUrl}/users`;
  private id = sessionStorage.getItem('id-user');
  private token = sessionStorage.getItem('access-token');
  public queryMovements: QueryMovements = new QueryMovements();

  constructor(
    private httpClient: HttpClient,
  ) {
    this.headers = new HttpHeaders();

    this.queryMovements.setCharges = true;
    this.queryMovements.setDeposits = true;
    this.queryMovements.setDuplicates = true;
    this.queryMovements.setDeep = true;
  }

  allMovements (offset: number) {
    const urlMovements =
      `${this.url}/` +
      `${this.id}/movements` +
      `?deep=${this.queryMovements.getDeep}` +
      `&offset=` + offset +
      `&max=${this.queryMovements.getMax}` +
      `&includeCharges=${this.queryMovements.getCharges}` +
      `&includeDeposit=${this.queryMovements.getDeposits}` +
      `&includeDuplicates=${this.queryMovements.getDuplicates}`
      ;
    this.queryMovements.setOffset = offset + this.queryMovements.getMax;
    return this.httpClient.get<Movement>(
             urlMovements,
             { headers: this.headers.set('Authorization', `Bearer ${this.token}`)}
           );
  }
}
