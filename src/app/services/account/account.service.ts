import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "@services/config/config.service";
import { Response } from '@shared/dto/credentials/response';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url:String = `${environment.backendUrl}/users`;

  constructor( private http:HttpClient, private finerio:ConfigService ) { 
  }

  getAccounts( userId:String ) {
    return this.http.get( `${ this.url }/${ userId }/accounts?deep=true`, ({ headers:this.finerio.getJsonHeaders() }) ).pipe(
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
