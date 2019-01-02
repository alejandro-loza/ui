import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Response } from '@shared/dto/credentials/response';
import { ConfigService } from '../config/config.service';
import { map, catchError } from 'rxjs/operators';
import { Credential } from '@shared/dto/credentials/credential';


@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  
  url:string = `${environment.backendUrl}/users`;
  DEEP_PARAM:string = "?deep=true"

  constructor( private http:HttpClient, private finerio:ConfigService ) { 
    
  }

  getCredential( credentialId ){
    let url:string = `${ environment.backendUrl}/credentials/${ credentialId + this.DEEP_PARAM }`
    return this.http.get( url,({ headers: this.finerio.getJsonHeaders() }));
  }

  getAllCredentials( userId:String ){
    return this.http.get( `${ this.url }/${ userId }/credentials?deep=true`, ({ headers : this.finerio.getJsonHeaders() })).pipe(
      map( res => {
        return res as Response;
      }, catchError( this.handleError ))
    )
  }

  createCredential( credential: Credential ) {
    let userId = sessionStorage.getItem("id-user");
    let url = `${this.url }/${ userId }/credentials`;
    let postBody = JSON.stringify(credential);
    
    return this.http.post(url, postBody, ({headers: this.finerio.getJsonHeaders() }));
  }

  updateCredential( credential ){
    let postBody = JSON.stringify( credential );
    let url = `${ environment.backendUrl }/credentials/${ credential.id }`;
    return this.http.put( url, postBody, ({ headers:this.finerio.getJsonHeaders() }));
  }

  deleteCredential( credentialId:string ){
    let url = `${ environment.backendUrl }/credentials/${ credentialId }`;
    return this.http.delete( url , ({ headers: this.finerio.getJsonHeaders() }));
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return errMsg
  }
}
