import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatefulFirebaseService {
  private _token: string;

  constructor() { }

  set token(token: string) {
    this._token = token;
  }

  get token(): string {
    return this._token;
  }
}
