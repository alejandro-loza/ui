import { HttpHeaders } from '@angular/common/http';

export class FinerioService {

  private headers: HttpHeaders;
  token_access: string;
  idUser: string;
  deep = true;

  constructor(
  ) {
    this.headers = new HttpHeaders();
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
    if ( this.token_access !== null || this.token_access !== undefined ) {
      this.headers = this.headers.set('Authorization', `Bearer ${this.token_access}`);
    }
    return this.headers;
  }
}