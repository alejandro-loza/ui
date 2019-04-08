import { Injectable } from '@angular/core';
import {ConfigParamsService} from '@params/config/config-params.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovementParamsService extends ConfigParamsService {
  movementsParams: HttpParams;
  constructor() {
    super();
    this.movementsParams  = new HttpParams();
    this.movementsParams = this.getConfigParams;
  }
}
