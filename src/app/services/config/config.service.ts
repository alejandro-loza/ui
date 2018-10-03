import { HttpHeaders } from '@angular/common/http';

export class FinerioService {

  private token_access: string;
  private headers: HttpHeaders;
  private deep = '?deep=true';

  constructor(
  ) {
    this.headers = new HttpHeaders();
  }

  setToken(token) {
    this.token_access = token;
  }

  getToken() {
    return this.token_access;
  }

  getJsonHeaders() {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
    if ( this.token_access !== null || this.token_access !== undefined ) {
      this.headers.set('Authorization', `Bearer ${this.token_access}`);
    }
    return this.headers;
  }
}
