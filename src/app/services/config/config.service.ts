import { HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

export class ConfigService {

  private headers: HttpHeaders;
  token_access: string;
  idUser: string;
  deep = true;

  constructor(
  ) {
    this.headers = new HttpHeaders();
    this.token_access = '';
    this.idUser = '';
  }

  public set setToken(token: string) {
    this.token_access = token;
  }

  public get getToken(): string {
    return this.token_access;
  }

  public set setId(id: string) {
    this.idUser = id;
  }

  public get getId(): string {
    return this.idUser;
  }

  getJsonHeaders() {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
    if ( !isNullOrUndefined(this.token_access) ) {
      this.headers = this.headers.set('Authorization', `Bearer ${this.token_access}`);
    }
    return this.headers;
  }

  refreshToken() {
    
  }
}