import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PasswordResponse } from '../../shared/dto/passwordResponse';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PasswordService {

  url:string = environment.newBackendUrl;

  constructor( private http: HttpClient ) { 
  }

  createForgotPasswordToken( email:string ){
    return this.http.get(`${ this.url }/password/createForgotPasswordToken?email=${email}`).pipe(
      map( res => {
          return res as PasswordResponse
      }), catchError( this.handleError )
    );
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
