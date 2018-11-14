import { Injectable } from                    '@angular/core';
import { HttpClient, HttpHeaders } from       '@angular/common/http';
import { environment } from                   '@env/environment';
import { map } from                           'rxjs/operators';
import { SignupData } from                    '@shared/dto/signupDto';
import * as M from                            'materialize-css/dist/js/materialize';
@Injectable()
export class SignupService {
  private headers = new HttpHeaders();
  url:string = environment.backendUrl;
  data: SignupData;

  constructor( private http: HttpClient ) { }
  
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
                      M.toast({html: 'I am a toast!'});
                      // this.toastService.show('Registro exitoso', 2000, 'green');
                    }) );
  }
}
