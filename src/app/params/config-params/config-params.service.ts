import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {
  private params: HttpParams;
  constructor() {
    this.params = new HttpParams();
    this.params = this.params.append('deep', 'true');
  }

  get getParams(): HttpParams {
    return this.params;
  }
}
