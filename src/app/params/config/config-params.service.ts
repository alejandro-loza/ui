import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {
  private readonly params: HttpParams;
  constructor() {
    this.params = new HttpParams();
    this.params = this.params.append('deep', 'true');
  }

  get getConfigParams(): HttpParams {
    return this.params;
  }
}
