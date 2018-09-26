import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from   '@angular/common/http';
import { environment } from               '@env/environment';
import { FinerioService } from            '@services/config/config.service';
import { User } from                      '@shared/dto/authLoginDot';
import { map } from                       'rxjs/operators';

@Injectable()
export class AuthService {

  private api = `${environment.backendUrl}/api`;

  user: User;
  token: string;
  url = `${this.api}/login`;

  constructor(
    private httpClient: HttpClient,
    private finerioService: FinerioService) {
      this.getData();
    }

  isAuth() {
    return (  this.token.length  > 0 ) ? true : false;
  }

  getData() {
    if ( sessionStorage.getItem('access token') ) {
      this.token = sessionStorage.getItem('access token');
    } else {
      this.token = '';
    }
  }

  saveData( access_token: string, refresh_token: string, username: string ) {
    sessionStorage.setItem( 'access token', access_token );
    sessionStorage.setItem( 'refresh token', refresh_token );

    this.finerioService.setToken( refresh_token );
  }

  login(user: User) {
    return this.httpClient.post(
      this.url, JSON.stringify({ username: user.email, password: user.password }), {headers : this.finerioService.getJsonHeaders()}
    ).pipe(
      map( (res: any ) => {
        console.log(res);
        this.saveData( res.access_token, res.refresh_token, res.username );
        this.getData();
        return true;
      })
    );
  }
}
