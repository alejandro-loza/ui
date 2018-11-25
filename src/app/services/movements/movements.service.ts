import { Injectable } from              '@angular/core';
import { HttpClient } from              '@angular/common/http';
import { environment } from             '@env/environment';

import { ConfigService } from           '../config/config.service';

import { map } from                     'rxjs/operators';

import { QueryMovements } from          '@app/shared/interfaces/queryMovements.interface';
import { Movement } from                '@interfaces/movement.interface';
import { Movements } from               '@interfaces/movements.interface';


@Injectable()
export class MovementsService {
  private url = `${environment.backendUrl}/users`;
  movementsList: Array<Movement>;


  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }

  /**
   * @function allMovements Esta función lo que hace traer todos lo movimiento con los siguientes parametros
   * @param offset : Esto es para obtener los siguientes movimientos
   *
   * Se inicializa el offset en 0, después de eso en la url se mandamn los siguientes parametros:
   * @var url - Esta es la variable como se le enviara la url para la petición al servidor, todo los parametros son opcionales,
   * pero se deben de tomar en cuenta.
   * @param id : Este es el id del usuario
   * @param deep : Si se quieres saber con detalle los movimiento
   * @param max : El número máximo de movimientos que se piden
   * @param duplicate : Para incluir los movimientos duplicaods
   */

  allMovements ( queryMovements: QueryMovements ) {
    if ( queryMovements.offset === 0 ) {
      this.movementsList = new Array();
    }
    const id = sessionStorage.getItem('id-user');
    const urlMovements =
      `${ this.url }/` +
      `${ id }/movements` +
      `?deep=${ queryMovements.deep }` +
      `&offset=` + queryMovements.offset +
      `&max=${ queryMovements.maxMovements }` +
      `&includeCharges=${ queryMovements.charges }` +
      `&includeDeposits=${ queryMovements.deposits }` +
      `&includeDuplicates=${ queryMovements.duplicates }`;
    return this.httpClient.get<Movements>(
      urlMovements,
      { headers: this.configService.getJsonHeaders()}
    ).pipe(
      map( (res: Movements) => {
        if ( this.movementsList.length === res.size) {
          return;
        }
        for (let i = 0; i < res.data.length; i++) {
          const movement: Movement = res.data[i];
          this.movementsList.push(movement);
        }
        return this.movementsList;
      })
    );
  }
}
