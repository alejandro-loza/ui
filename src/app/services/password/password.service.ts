import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PasswordResponse } from '../../shared/dto/passwordResponse';
import { PasswordResetRequest } from '../../shared/dto/recoveryPasswordRequestDto';
import { EmailObj } from '../../shared/dto/emailObj';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PasswordService {

  url:string = environment.newBackendUrl;
  headers = new HttpHeaders();

  constructor( private http: HttpClient ) {
    this.headers.append('Content-Type', 'application/json;charset=UTF-8');
    this.headers.append('Accept', 'application/json;charset=UTF-8');
  }

  createForgotPasswordToken( email:string ){
    return this.http.get(`${ this.url }/password/createForgotPasswordToken?email=${email}`).pipe(
      map( res => {
          return res as PasswordResponse
      }), catchError( this.handleError )
    );
  }

  validateToken(token:string){
    return this.http.get(`${ this.url }/password/getEmailAndValidateToken?token=${token}`).pipe(
      map( res =>{
        return res as EmailObj
      }),catchError( this.handleError )
    );
  }   
  
  resetPassword( passwordReset:PasswordResetRequest ){
    return this.http.post(`${this.url}/password/setNewPassword`, passwordReset , ({ headers: this.headers})).pipe(
          map( res => {
            return res as PasswordResetRequest
          }), catchError( this.handleError )
        );      
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return errMsg
  }
}
