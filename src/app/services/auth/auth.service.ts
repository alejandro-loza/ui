import { Injectable } from                '@angular/core';
import { HttpClient } from   '@angular/common/http';

import { environment } from               '@env/environment';

import { ConfigService } from            '@services/config/config.service';

import { User } from                      '@app/shared/interfaces/authLogin.interface';
import { InfoUser } from                  '@interfaces/infoUser.interface';

import { map } from                       'rxjs/operators';

@Injectable()
export class AuthService {

  url = `${environment.backendUrl}/login`;
  user: User;
  token: string;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.getData();
  }

  isAuth() {
    return (  this.token.length  > 0 ) ? true : false;
  }

  getData() {
    if ( sessionStorage.getItem('access-token') ) {
      this.token = sessionStorage.getItem('access-token');
    }
  }

  saveData( access_token: string, refresh_token: string ) {
    sessionStorage.setItem( 'access-token', access_token );
    sessionStorage.setItem( 'refresh-token', refresh_token );

    this.configService.setToken = access_token;
  }

  login(user: User) {
    return this.httpClient.post<User>(
      this.url, JSON.stringify({ username: user.email, password: user.password }), {headers : this.configService.getJsonHeaders()}
    ).pipe(
      map( (res: any ) => {
        this.saveData( res.access_token, res.refresh_token);
        this.getData();
        return true;
      })
    );
  }

  personalInfo() {
    const token: string = sessionStorage.getItem('access-token');
    return this.httpClient.get<InfoUser>(`${environment.backendUrl}/me`, {headers: this.configService.getJsonHeaders()})
      .pipe(map( (res: InfoUser) => {
        sessionStorage.setItem( 'id-user', res.id );
        this.configService.setId = res.id;
      })
    );
  }
}
