import { Injectable } from                    '@angular/core';
import { HttpClient, HttpHeaders } from       '@angular/common/http';
import { environment } from                   '@env/environment';
import { map } from                           'rxjs/operators'; 
import { MzToastService } from                'ngx-materialize';
import { SignupData } from                    '@shared/dto/signupDto';

@Injectable()
export class SignupService {
  private headers = new HttpHeaders();
  url:string = environment.backendUrl;
  data: SignupData;

  constructor( private http:HttpClient, private toastService: MzToastService, ) {
  
   }
  
  signup( data ){
    let body =  JSON.stringify({ 
          email: data.email, 
          password: data.password, 
          passwordConfirmation: data.passwordConfirm, 
          termsAndConditionsAccepted: data.termsAndConditions,
          blog: data.blog });

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    console.log( this.headers );
    
    return this.http.post( `${ this.url }/users` , body, { headers:this.headers })  
                    .pipe( map( res => {
                      console.log( "res: " + res );
                      this.toastService.show('Registro exitoso', 2000, 'green');
                    }) );
  }
}
