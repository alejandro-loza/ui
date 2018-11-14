import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@shared/dto/credentials/response';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url:String = `${environment.backendUrl}/users`;
  headers = new HttpHeaders();
  accessToken = sessionStorage.getItem("access-token")

  constructor( private http:HttpClient ) { 
    this.headers = this.headers.append('Content-Type', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Authorization', `Bearer ${ this.accessToken }`);
  }

  getAccounts( userId:String ) {
    return this.http.get( `${ this.url }/${ userId }/accounts?deep=true`, ({ headers:this.headers }) ).pipe(
      map( res => {
        return res as Response  
      }, catchError ( this.handleError ))
    );
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return errMsg
  }
}
