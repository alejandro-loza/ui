import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FinerioService } from '../services.index';
import { map, catchError } from 'rxjs/operators'; 
import { MzToastService } from 'ngx-materialize';


const DATE_KEYS: string[] = ['date', 'lastupdated'];

@Injectable()
export class SignupService extends FinerioService {

  constructor( private http:HttpClient, private toastService: MzToastService, ) {
    super();
   }
  
  signup( password:string, passwordConfirmation:string, 
          email:string, termsAndConditionsAccepted:boolean, blog:boolean ){
    
        let body =  JSON.stringify({ password: password, 
                passwordConfirmation: passwordConfirmation, 
                email:email, 
                termsAndConditionsAccepted:termsAndConditionsAccepted,
                blog:blog });

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return this.http.post(`${ this.getUrl() }/users` , body, { headers:headers })  
                          .pipe( map( res => {
                            this.toastService.show('Registro exitoso', 5000, 'green');
                          }) );
  }
}
