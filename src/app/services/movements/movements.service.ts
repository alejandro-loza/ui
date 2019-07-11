import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';
import { DateApiService } from '@services/date-api/date-api.service';
import { ToastService } from '@services/toast/toast.service';
import { MixpanelService } from '@services/mixpanel/mixpanel.service';

import { ParamsMovements } from '@interfaces/paramsMovements.interface';
import { Movement } from '@interfaces/movement.interface';
import { Response } from '@interfaces/response.interface';

import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { isNull, isNullOrUndefined } from 'util';
import {ConfigParamsService} from '@params/config/config-params.service';
import {StatefulMovementsService} from '@stateful/movements/stateful-movements.service';
import {EditMovementListService} from '@services/movements/edit-list/edit-movement-list.service';

@Injectable()
export class MovementsService {
  private url = `${environment.backendUrl}/users`;
  private id: string;
  private movementsList: Movement[];

  constructor(
    private configParamsService: ConfigParamsService,
    private configService: ConfigService,
    private dateApiService: DateApiService,
    private dateService: DateApiService,
    private editMovementListService: EditMovementListService,
    private httpClient: HttpClient,
    private mixpanelService: MixpanelService,
    private statefulMovementService: StatefulMovementsService,
    private toastService: ToastService,
  ) {
    this.movementsList = [];
  }

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

  getMovementsOnlyDashboard(paramsMovements: ParamsMovements): Observable<HttpResponse<Response<Movement>>> {
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
          res.body.data = res.body.data.map((movement) => {
            movement = {
              ...movement,
              customDate: this.dateApiService.formatDateForAllBrowsers(movement.customDate.toString())
            };
            return movement;
          });
          this.movementsList = [ ...this.movementsList, ...res.body.data ];
          return res;
        }),
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

  getMovements(paramsMovements: ParamsMovements): Observable<HttpResponse<Response<Movement>>> {
    this.id = this.configService.getUser.id;
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
          res.body.data = res.body.data.map((movement) => {
            movement = {
              ...movement,
              customDate: this.dateApiService.formatDateForAllBrowsers(movement.customDate.toString())
            };
            return movement;
          });
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

  createMovement(movement: Movement): Observable<HttpResponse<Movement>> {
    const id = this.configService.getUser.id;
    let body: string;
    // error de la cuenta porque no entra a este IF, por eso me lo manda como cash
    body = JSON.stringify({
      amount: movement.amount,
      balance: 0,
      category: movement.concepts[0].category,
      customDate: this.dateService.dateApi(movement.customDate),
      customDescription: movement.customDescription,
      date: this.dateService.dateApi(movement.customDate),
      description: movement.customDescription,
      duplicated: movement.duplicated,
      type: movement.type.toUpperCase()
    });
    return this.httpClient
      .post<Movement>(`${this.url}/${id}/movements`, body, {
        observe: 'response',
        headers: this.configService.getHeaders
      })
      .pipe(
        map((res) => {
          this.mixpanelService.setIdentify();
          this.mixpanelService.setTrackEvent('Create movement');
          return res;
        })
      );
  }

  createManualAccountMovement(movement: Movement, accountId: string): Observable<HttpResponse<Movement>> {
    const URL = `${environment.backendUrl}/accounts/${accountId}/movements`;
    const body = JSON.stringify({
      amount: movement.amount,
      balance: 0,
      category: movement.concepts[0].category,
      customDate: this.dateService.dateApi(movement.customDate),
      customDescription: movement.customDescription,
      date: this.dateService.dateApi(movement.customDate),
      description: movement.customDescription,
      duplicated: movement.duplicated,
      type: movement.type.toUpperCase()
    });
    return this.httpClient
      .post<Movement>(URL, body, {
        observe: 'response',
        headers: this.configService.getHeaders
      })
      .pipe(
        map((res) => {
          this.mixpanelService.setIdentify();
          this.mixpanelService.setTrackEvent('Create movement');
          return res;
        })
      );
  }

  updateMovement(movement: Movement) {
    let body: Movement = {
      duplicated: movement.duplicated,
      customDate: <any>this.dateService.dateApi(movement.customDate),
      inBalance: isNullOrUndefined(movement.inBalance) ? null : movement.inBalance,
      type: movement.type.toUpperCase()
    };

    movement.customDescription !== '' && !isNull(movement.customDescription)
      ? (body = { ...body, customDescription: movement.customDescription })
      : (body = { ...body, customDescription: movement.description });

    if (!isNull(movement.amount)) {
      body = { ...body, amount: movement.amount };
    }
    if (movement.concepts[0].category) {
      body.category = { id: movement.concepts[0].category.id };
    }
    if (movement.account) {
      body.account = { ...body.account, id: movement.account.id };
    }
    return this.httpClient.put<Movement>(
      `${environment.backendUrl}/movements/${movement.id}`,
      body,
      {
        observe: 'response',
        headers: this.configService.getHeaders,
        params: this.configParamsService.getConfigParams
      }
    );
  }

  deleteMovement(idMovement: string): Observable<HttpResponse<Movement>> {
    return this.httpClient.delete<Movement>(`${environment.backendUrl}/movements/${idMovement}`, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }
}
