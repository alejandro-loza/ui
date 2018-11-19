import { Injectable } from              '@angular/core';
import { HttpClient } from              '@angular/common/http';
import { environment } from             '@env/environment';

import { ConfigService } from           '../config/config.service';

import { map } from                     'rxjs/operators';

import { QueryMovements } from          '@classes/queryMovementsDto.class';
import { Movement } from                '@interfaces/movement.interface';
import { Movements } from               '@interfaces/movements.interface';


@Injectable()
export class MovementsService {
  movimientosObj: any;
  movimientosList = [];
  private url = `${environment.backendUrl}/users`;
  private id = this.configService.getId;
  private token = this.configService.getToken;
  public queryMovements: QueryMovements = new QueryMovements();
  movementOrder: Movement[] = [];
  lastMovement: Movement;
  movementsOrderByDate: any = {};
  options = { day: 'numeric', month: 'narrow', year: 'numeric' };
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
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
             { headers: this.configService.getJsonHeaders()}
           ).pipe(
             map((res: any) => {
 1
              for (let i = 0; i < res.data.length; i++) {
                const movement: Movement = res.data[i];

                /**
                 * Agrupación por fechas
                 */
                this.movementsOrderByDate[
                  new Date(movement.customDate).toLocaleDateString( navigator.language , {year: 'numeric', month: 'long', day: 'numeric'})
                ] = this.movementOrder;

                /**
                 * Checa si es el último movimiento, y debe devolver la lista
                 */
                if ( movement === res.data[res.data.length - 1] ) {
                  this.lastMovement = res.data[res.data.length - 1];
                  console.log('%c Servicio log', 'color: yellow', this.movementsOrderByDate);
                  return this.movementsOrderByDate;
                }

                /**
                 * Se checa el movimiento actual con el siguiente para saber si tienen la misma fecha. Si es cumple esto, se agrupan,
                 * sino se agrega el movimiento actual y se crea una nueva propiedad en el objeto con la fecha del siguiente movimiento
                 */
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
