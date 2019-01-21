import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ConfigService } from "@services/config/config.service";
import { environment } from "@env/environment";
import { Observable } from 'rxjs';
import { Response } from "@interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http:HttpClient, private configService:ConfigService ) { }

  getCategoriesInfo():Observable<HttpResponse<Response>> {
    const URL = `${ environment.backendUrl }/categories?deep=true`
    return this.http.get<Response>( URL, {
      observe: 'response',
      headers: this.configService.getJsonHeaders()
    });
  }

}
