import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Response } from '@interfaces/response.interface';
import { AccountInterface } from '@interfaces/account.interfaces';

import { ConfigService } from '@services/config/config.service';
import { ConfigParamsService } from '@params/config/config-params.service';
import {AccountsBeanService} from '@services/account/accounts-bean.service';

import {StatefulAccountService} from '@stateful/account/stateful-account.service';
import {StatefulAccountsService} from '@stateful/accounts/stateful-accounts.service';
import {EditManualAccountListService} from '@services/account/edit-manualAccount-list/edit-manual-account-list.service';

import { ManualAccountHttp } from '@app/interfaces/manual-accounts/manual-account-http.interface';
import { MAResponse } from '@app/interfaces/manual-accounts/manual-account-response.interface';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {isNullOrUndefined, isUndefined} from 'util';
import {EditAccountListService} from '@services/account/edit-account-list/edit-account-list.service';
import {CleanerService} from '@services/cleaner/cleaner.service';
import {FilterAccountsService} from '@services/account/filter-accounts/filter-accounts.service';
import {FilterBalanceService} from '@services/balance/filters-balance-account/filter-balance.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: String = `${environment.backendUrl}/users`;

  constructor(
    private accountsBeanService: AccountsBeanService,
    private filterBalance: FilterBalanceService,
    private cleaner: CleanerService,
    private configService: ConfigService,
    private configParamsService: ConfigParamsService,
    private editAccountsService: EditAccountListService,
    private editManualAccountsService: EditManualAccountListService,
    private filterAccounts: FilterAccountsService,
    private httpClient: HttpClient,
    private statefulAccount: StatefulAccountService,
    private statefulAccounts: StatefulAccountsService,
  ) {}

  getAccounts(): Observable<HttpResponse<Response<AccountInterface>>> {
    const id = this.configService.getUser.id;
    return this.httpClient
      .get<Response<AccountInterface>>(`${this.url}/${id}/accounts`, {
        observe: 'response',
        headers: this.configService.getHeaders,
        params: this.configParamsService.getConfigParams
      })
      .pipe(
        map(res => {

          this.filterAccounts.filterAccounts(res.body.data);

          this.statefulAccounts.manualAccounts = this.filterAccounts.manualAccounts;
          this.statefulAccounts.accounts = this.filterAccounts.accounts;

          this.filterBalance.filterBalance();

          return res;
        })
      );
  }

  updateManualAccount(body: ManualAccountHttp, id: string): Observable<HttpResponse<Response<AccountInterface>>> {
    const url = `${environment.backendUrl}/accounts/${id}`;
    return this.httpClient.put<Response<AccountInterface>>(url, body, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  deleteAccount(account: AccountInterface): Observable<HttpResponse<Response<AccountInterface>>> {
    const url = `${environment.backendUrl}/accounts/` + account.id;
    return this.httpClient.delete<Response<AccountInterface>>(url, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  createManualAccount(body: ManualAccountHttp): Observable<HttpResponse<MAResponse>> {
    const url = `${environment.apiUrl}/apiv2/manualAccount`;
    return this.httpClient.post<MAResponse>(url, body, {
      observe: 'response',
      headers: this.configService.getHeaders
    });
  }

  getManualAccountNatureWithOutDefaults(nature: string): string {
    let result: string = '';
    let natureNames: string[] = [
      'ma_cash',
      'ma_creditCard',
      'ma_debitCard',
      'ma_debt',
      'ma_goods',
      'ma_investment',
      'ma_lifeInsurance',
      'ma_mortgage',
      'ma_personalCredit'
    ];
    if (!isNullOrUndefined(nature)) {
      natureNames.forEach((natureName) => {
        if (nature.includes(natureName)) {
          result = natureName;
        }
      });
    }
    return result;
  }

  getManualAccountNameByNature(nature: string): string {
    let name: string = 'Efectivo';
    let natureNames: string[] = [
      'ma_cash',
      'ma_creditCard',
      'ma_debitCard',
      'ma_debt',
      'ma_goods',
      'ma_investment',
      'ma_lifeInsurance',
      'ma_mortgage',
      'ma_personalCredit'
    ];
    let maNames: string[] = [
      'Efectivo',
      'Tarjeta de crédito',
      'Tarjeta de débito',
      'Deuda',
      'Bienes',
      'Inversión',
      'Seguro de vida',
      'Hipoteca',
      'Crédito Personal'
    ];

    for (let i = 0; i < natureNames.length; i++) {
      if (!isNullOrUndefined(nature)) {
        if (nature.includes(natureNames[i])) {
          name = maNames[i];
        }
      }
    }
    return name;
  }

  getIconSrcByNature(nature: string): string {
    let name: string = 'ma_cash';
    let iconsName: string[] = [
      'ma_cash',
      'ma_creditCard',
      'ma_debitCard',
      'ma_debt',
      'ma_goods',
      'ma_investment',
      'ma_lifeInsurance',
      'ma_mortgage',
      'ma_personalCredit'
    ];
    if (!isNullOrUndefined(nature)) {
      iconsName.forEach((iconName) => {
        if (nature.includes(iconName)) {
          name = iconName;
        }
      });
    }
    return name;
  }
}
