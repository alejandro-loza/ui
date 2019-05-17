import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { ToastService } from '@services/toast/toast.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { NewMovement } from '@interfaces/newMovement.interface';
import { Movement } from '@interfaces/movement.interface';
import { Response } from '@interfaces/response.interface';

import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable()
export class MovementsService {
  private url = `${environment.backendUrl}/users`;
  private id: string;
  private movementsList: Movement[];

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private dateService: DateApiService,
    private toastService: ToastService,
    private dateApiService: DateApiService
  ) { this.movementsList = []; }

  get getMovementList(): Movement[] {
    return this.movementsList;
  }

  /**
   * @function allMovements Esta funcion lo que hace traer todos lo movimiento con los siguientes parametros
   *
   * Se inicializa el offset en 0, después de eso en la url se mandamn los siguientes parametros:
   * @var url - Esta es la variable como se le enviara la url para la petición al servidor, todo los parametros son opcionales,
   * pero se deben de tomar en cuenta.
   * @param paramsMovements
   */

  getMovements(paramsMovements: ParamsMovements): Observable<HttpResponse<Response<Movement>>> {
    this.id = this.configService.getUser.id;
    if (paramsMovements.offset === 0) {
      this.movementsList = [];
    }
    let urlMovements =
      `${this.url}/` +
      `${this.id}/movements` +
      `?deep=${paramsMovements.deep}` +
      `&offset=${paramsMovements.offset}` +
      `&max=${paramsMovements.maxMovements}` +
      `&includeCharges=${paramsMovements.charges}` +
      `&includeDeposits=${paramsMovements.deposits}` +
      `&includeDuplicates=${paramsMovements.duplicates}`;

    if (!isNullOrUndefined(paramsMovements.startDate || paramsMovements.endDate)) {
      urlMovements =
        urlMovements + `&startDate=${paramsMovements.startDate}` + `&endDate=${paramsMovements.endDate}`;
    }
    return this.httpClient
      .get<Response<Movement>>(urlMovements, {
        observe: 'response',
        headers: this.configService.getHeaders
      })
      .pipe(
        map((res) => {
          if (res.body.data.length === 0) {
            return res;
          }
          res.body.data.forEach((movement) => {
            movement.customDate = this.dateApiService.formatDateForAllBrowsers(movement.customDate.toString());
          });
          this.movementsList = [ ...this.movementsList, ...res.body.data ];
          return res;
        }),
        distinctUntilChanged(),
        catchError((error: HttpErrorResponse) => {
          this.toastService.setCode = error.status;
          if (error.status === 0) {
            this.toastService.toastGeneral();
          } else if (error.status === 401) {
            this.getMovements(paramsMovements);
            this.toastService.toastGeneral();
          } else if (error.status === 500) {
            this.toastService.setMessage = '¡Ha ocurrido un error al obtener tus movimientos!';
            this.toastService.toastGeneral();
          }
          return throwError(error);
        })
      );
  }

  createMovement(movement: NewMovement): Observable<HttpResponse<Movement>> {
    const id = this.configService.getUser.id;
    let body: string;
    // error de la cuenta porque no entra a este IF, por eso me lo manda como cash
    body = JSON.stringify({
      amount: movement.amount,
      balance: 0,
      customDate: this.dateService.dateApi(movement.date),
      customDescription: movement.description,
      date: this.dateService.dateApi(movement.date),
      description: movement.description,
      duplicated: movement.duplicated,
      type: movement.type.toUpperCase()
    });
    return this.httpClient.post<Movement>(`${this.url}/${id}/movements`, body, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  createManualAccountMovement(movement: NewMovement, accountId: string) {
    let URL = `${environment.backendUrl}/accounts/${accountId}/movements`;
    let body = JSON.stringify({
      amount: movement.amount,
      balance: 0,
      customDate: this.dateService.dateApi(movement.date),
      customDescription: movement.description,
      date: this.dateService.dateApi(movement.date),
      description: movement.description,
      duplicated: movement.duplicated,
      type: movement.type.toUpperCase(),
      category: movement.category
    });
    return this.httpClient.post<Movement>(URL, body, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  updateMovement(movement: Movement) {
    const body = {
      account: movement.account,
      amount: movement.amount,
      balance: movement.balance,
      customDate: this.dateService.dateApi(movement.customDate),
      customDescription: movement.customDescription,
      date: movement.date,
      description: movement.description,
      duplicated: movement.duplicated,
      inBalance: isNullOrUndefined(movement.inBalance) ? null : movement.inBalance,
      type: movement.type.toUpperCase()
    };
    if (movement.concepts[0].category) {
      body['category'] = { id: movement.concepts[0].category.id };
    }
    return this.httpClient.put<Movement>(`${environment.backendUrl}/movements/${movement.id}`, body, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  deleteMovement(idMovement: string): Observable<HttpResponse<Movement>> {
    return this.httpClient.delete<Movement>(`${environment.backendUrl}/movements/${idMovement}`, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }
}
