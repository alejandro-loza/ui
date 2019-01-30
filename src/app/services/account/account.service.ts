import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Response } from '@interfaces/response.interface';
import { AccountInterface } from '@interfaces/account.interfaces';

import { ConfigService } from '@services/config/config.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: String = `${environment.backendUrl}/users`;

  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAccounts(userId: string): Observable<HttpResponse<Response<AccountInterface>>> {
    return this.http.get<Response<AccountInterface>>(
      `${this.url}/${userId}/accounts?deep=true`,
      {
        observe: 'response',
        headers: this.finerio.getJsonHeaders()
      }
    );
  }

  deleteAccount(accountId: string): Observable<HttpResponse<Response<AccountInterface>>> {
    const url = `${environment.backendUrl}/accounts/` + accountId;
    return this.http.delete<Response<AccountInterface>>(url, {
      observe: 'response',
      headers: this.finerio.getJsonHeaders()
    });
  }
}
