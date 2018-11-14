import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Response } from '@shared/dto/credentials/response';


@Injectable()
export class InstitutionService {

  headers = new HttpHeaders();
  constructor( private http:HttpClient, private auth:AuthService ) { 
    let token = this.auth.token;
    this.headers = this.headers.append('Content-Type', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers = this.headers.append('Authorization', `Bearer ${ token }`);
  }

  getAllInstitutions() {
    return this.http.get(`${ environment.backendUrl }/institutions`, ({headers: this.headers}))
                    .pipe( map( res => {
                      return res as Response
                      })
                    );
            
  }

}
