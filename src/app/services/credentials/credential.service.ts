import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Response } from '@shared/dto/credentials/response';
import { AuthService } from '../auth/auth.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  headers = new HttpHeaders();
  url:String = `${environment.backendUrl}/users`;

  constructor( private http:HttpClient, private auth: AuthService ) { 
    let token = this.auth.token;
    this.headers = this.headers.append('Content-Type', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Authorization', `Bearer ${ token }`);
  }

  getAllCredentials( userId:String ){
    return this.http.get( `${ this.url }/${ userId }/credentials?deep=true`, ({ headers : this.headers })).pipe(
      map( res => {
        return res as Response;
      }, catchError( this.handleError ))
    )
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return errMsg
  }
}
