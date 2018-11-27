import { Injectable } from              '@angular/core';
import { HttpHeaders,
         HttpClient } from              '@angular/common/http';
import { environment } from             '@env/environment.prod';
import { RefreshToken } from            '@interfaces/refreshToken.interface';
import { map } from                     'rxjs/operators';
import { isNullOrUndefined } from       'util';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private headers: HttpHeaders;
  private url = `${environment.apiUrl}/oauth/access_token`;
  token_access: string;
  token_refresh: string;
  idUser: string;
  deep = true;

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers = new HttpHeaders();
  }

  public set setToken(token: string) {
    this.token_access = token;
  }

  public get getToken(): string {
    return this.token_access;
  }

  public set setRefreshToken(refreshToken: string) {
    this.token_refresh = refreshToken;
  }

  public get getRefreshToken(): string {
    return this.token_refresh;
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
    /**
     * Se checa si el toquen es undefined o null. Esto puede darse por dos circunstancias, si el token no existe es undefined,
     * pero si el token expira entonces es nulo.
     */
    if ( !isNullOrUndefined(this.token_access) ) {
      this.headers = this.headers.set('Authorization', `Bearer ${this.token_access}`);
    } else if (sessionStorage.getItem('access-token')) {
      this.setToken = sessionStorage.getItem('access-token');
      this.headers = this.headers.set('Authorization', `Bearer ${this.token_access}`);
    }

    return this.headers;
  }

  refreshToken() {
    if ( this.token_refresh === undefined ) {
      this.setRefreshToken = sessionStorage.getItem('refresh-token');
    }
    this.httpClient.post(
      this.url,
      `grant_type=refresh_token&refresh_token=${this.getRefreshToken}`,
      { headers: this.headers.set('Content-Type', 'application/x-www-form-urlencoded') }
    ).pipe(
      map( (res: RefreshToken) => {
        sessionStorage.clear();

        sessionStorage.setItem( 'access-token', res.access_token );
        sessionStorage.setItem( 'refresh-token', res.refresh_token );
        sessionStorage.setItem( 'id-user', this.getId);

        this.setToken = res.access_token;
        this.setRefreshToken = res.refresh_token;
      })
    ).subscribe( res => res, err => console.error('%c Config.service.#refreshToken()', 'color: orange', err));
  }
}
