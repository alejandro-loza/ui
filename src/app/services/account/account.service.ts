import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '@env/environment';

import { Response } from '@interfaces/response.interface';
import { AccountInterface } from '@interfaces/account.interfaces';

import { ConfigService } from '@services/config/config.service';
import { ConfigParamsService } from '@params/config/config-params.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// MA
import { ManualAccountHttp } from '@app/interfaces/manual-accounts/manual-account-http.interface';
import { MAResponse } from '@app/interfaces/manual-accounts/manual-account-response.interface';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	url: String = `${environment.backendUrl}/users`;

	private accounts: AccountInterface[];

	constructor(
		private httpClient: HttpClient,
		private configService: ConfigService,
		private configParamsService: ConfigParamsService
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
				map((res) => {
					this.accounts = res.body.data;
					return res;
				})
			);
	}

	deleteAccount(accountId: string): Observable<HttpResponse<Response<AccountInterface>>> {
		const url = `${environment.backendUrl}/accounts/` + accountId;
		return this.httpClient.delete<Response<AccountInterface>>(url, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}

	get getAccountData() {
		return this.accounts;
	}

	createManualAccount(body: ManualAccountHttp): Observable<HttpResponse<Response<MAResponse>>> {
		const url = `${environment.apiUrl}/apiv2/manualAccount`;
		return this.httpClient.post<Response<MAResponse>>(url, body, {
			observe: 'response',
			headers: this.configService.getHeaders
		});
	}
}
