import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { ConfigService } from '@services/config/config.service';

import { AccountsInterface } from '@interfaces/accounts.interface';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: String = `${environment.backendUrl}/users`;

  constructor(private http: HttpClient, private finerio: ConfigService) {}

  getAccounts(userId: string): Observable<HttpResponse<AccountsInterface>> {
    return this.http.get<AccountsInterface>(
      `${this.url}/${userId}/accounts?deep=true`,
      {
        observe: 'response',
        headers: this.finerio.getJsonHeaders()
      }
    );
  }

  deleteAccount(accountId: string): Observable<HttpResponse<AccountsInterface>> {
    const url = `${environment.backendUrl}/accounts/` + accountId;
    return this.http.delete<AccountsInterface>(url, {
      observe: 'response',
      headers: this.finerio.getJsonHeaders()
    });
  }
}
