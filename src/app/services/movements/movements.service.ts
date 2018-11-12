import { Injectable } from             '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from            '@env/environment';

import { QueryMovements } from         '@classes/queryMovementsDto.class';
import { Movement } from               '@interfaces/movement.interface';
import { Movements } from              '@interfaces/movements.interface';
import { browser } from 'protractor';


@Injectable()
export class MovementsService {
  movimientosObj: any;
  movimientosList = [];
  private headers: HttpHeaders;
  private url = `${environment.backendUrl}/users`;
  private id = sessionStorage.getItem('id-user');
  private token = sessionStorage.getItem('access-token');
  public queryMovements: QueryMovements = new QueryMovements();
  movementOrder: Movement[] = [];
  lastMovement: Movement;
  movementsOrderByDate: any = {};
  options = { day: 'numeric', month: 'narrow', year: 'numeric' };
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
      `&includeDeposits=${this.queryMovements.getDeposits}` +
      `&includeDuplicates=${this.queryMovements.getDuplicates}`
      ;
    this.queryMovements.setOffset = offset + this.queryMovements.getMax;
    return this.httpClient.get<Movements>(
             urlMovements,
             { headers: this.headers.set('Authorization', `Bearer ${this.token}`)}
           ).pipe(
             map((res: any) => {
 1
              for (let i = 0; i < res.data.length; i++) {
                const movement: Movement = res.data[i];
                this.movementsOrderByDate[
                  new Date(movement.customDate).toLocaleDateString( navigator.language , {year: 'numeric', month: 'long', day: 'numeric'})
                ] = this.movementOrder;
                if ( movement === res.data[res.data.length - 1] ) {
                  this.lastMovement = res.data[res.data.length - 1];
                  console.log('%c Servicio log', 'color: yellow', this.movementsOrderByDate);
                  return this.movementsOrderByDate;
                }
                if (
                  (new Date(movement.date).getFullYear() && new Date(movement.date).getMonth() && new Date(movement.date).getDate())
                  ===
                  (new Date(res.data[i + 1].date).getFullYear() && new Date(res.data[i + 1].date).getMonth() && new Date(res.data[i + 1].date).getDate())
                ) {
                  this.movementOrder.push(movement);
                } else {
                  this.movementOrder.push(movement);
                  this.movementOrder = new Array;
                }
              }
             })
           );
  }
}
