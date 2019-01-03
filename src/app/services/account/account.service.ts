import { Injectable } from                 '@angular/core';
import { HttpClient, HttpResponse } from   '@angular/common/http';
import { ConfigService } from              '@services/config/config.service';
import { Response } from                   '@shared/dto/credentials/response';
import { environment } from                '@env/environment';
import { Observable } from                 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: String = `${environment.backendUrl}/users`;

  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAccounts(userId: string): Observable<HttpResponse<Response>> {
    return this.http.get<Response>(`${this.url}/${userId}/accounts?deep=true`, {
      observe: 'response',
      headers: this.finerio.getJsonHeaders()
    });
  }

  deleteAccount(accountId: string) {
    let url = `${environment.backendUrl}/accounts/` + accountId;
    return this.http.delete(url, { headers: this.finerio.getJsonHeaders() });
  }

}
