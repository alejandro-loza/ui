import { Injectable } from                    '@angular/core';
import { HttpClient, 
         HttpHeaders, 
         HttpErrorResponse } from             '@angular/common/http';
import { environment } from                   '@env/environment';
import { catchError } from                    'rxjs/operators';
import { throwError } from                    'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  private headers = new HttpHeaders();
  url:string = environment.backendUrl;

  constructor( private http: HttpClient ) { }

  passwordRecovery( email:string ){
      this.headers.append('Content-Type', 'application/json;charset=UTF-8');
      this.headers.append('Accept', 'application/json;charset=UTF-8');

      let body = JSON.stringify({ email: email });

      return this.http.post(`${this.url}/security/passwordrecovery`, body , ({ headers: this.headers })).pipe(
        catchError( this.handleError )
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



}
