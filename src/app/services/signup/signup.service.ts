import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { map } from 'rxjs/operators'; 
import { MzToastService } from 'ngx-materialize';

@Injectable()
export class SignupService {

  url:string = environment.backendUrl;
  constructor( private http:HttpClient, private toastService: MzToastService, ) {
    
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

        return this.http.post(`${ this.url }/users` , body, { headers:headers })  
                          .pipe( map( res => {
                            this.toastService.show('Registro exitoso', 2000, 'green');
                          }) );
  }
}
