import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Response } from '@shared/dto/credentials/response';
import { FinerioService } from '../config/config.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  
  url:String = `${environment.backendUrl}/users`;

  constructor( private http:HttpClient, private finerio:FinerioService ) { 
    
  }

  getAllCredentials( userId:String ){
    return this.http.get( `${ this.url }/${ userId }/credentials?deep=true`, ({ headers : this.finerio.getJsonHeaders() })).pipe(
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
