import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

export class FinerioService {

  private server: string;
  private token_access: string;
  private headers: HttpHeaders;

  constructor(
  ) {
    this.server = `${ environment.backendUrl }/api`;
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    if ( this.token_access !== null || this.token_access !== undefined ) {
      this.headers.append('Authorization', `Bearer ${ this.token_access } `);
    }
  }

  getUrl(){
    return this.server;
  }

  setToken(token) {
    this.token_access = token;
  }

  getToken() {
    return this.token_access;
  }

  getJsonHeaders() { 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }
}
