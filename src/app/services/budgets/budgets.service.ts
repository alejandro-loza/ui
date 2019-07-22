import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { ConfigService } from '@services/config/config.service';
import { Observable } from 'rxjs';
import { Budget } from '@interfaces/budgets/budget.interface';
import { BudgetsResponse } from '@interfaces/budgets/budgetsResponse.interface';
import { NewBudget } from '@interfaces/budgets/new-budget.interface';
import { Response } from '@interfaces/response.interface';
import { ConfigParamsService } from '@params/config/config-params.service';

@Injectable({
	providedIn: 'root'
})
export class BudgetsService {
	private url: string;
	constructor(
		private http: HttpClient,
		private configService: ConfigService,
		private configParams: ConfigParamsService
	) {}

	getAllBudgets(from: string, to: string): Observable<HttpResponse<BudgetsResponse>> {
		this.url = `${environment.apiUrl}/apiv3/budget?from=${from}&to=${to}`;
		return this.http.get<BudgetsResponse>(this.url, {
			observe: 'response',
			headers: this.configService.getHeaders,
			params: this.configParams.getConfigParams
		});
	}

	createBudget(budget: NewBudget): Observable<HttpResponse<Response<Budget>>> {
		budget.user = this.configService.getUser;
		this.url = `${environment.backendUrl}/budgets/undefined/replace`;
		return this.http.put<Response<Budget>>(this.url, budget, {
			observe: 'response',
			headers: this.configService.getHeaders,
			params: this.configParams.getConfigParams
		});
	}

	updateBudget(budget: Budget): Observable<HttpResponse<Response<Budget>>> {
		this.url = `${environment.backendUrl}/budgets/${budget.id}/replace`;
		return this.http.put<Response<Budget>>(this.url, budget, {
			observe: 'response',
			headers: this.configService.getHeaders,
			params: this.configParams.getConfigParams
		});
	}

	/* METHOD FOR FINERIO 3.0
    createBudget(budget: NewBudget): Observable<HttpResponse<Response<Budget>>> {
        this.url = `${environment.backendUrl}/users/${ this.id }/budgets`;
        return this.http.post<Response<Budget>>(this.url, budget, {
            observe: 'response',
      headers: this.configService.getHeaders,
      params: this.configParams.getParams
        });
    }*/

	deleteBudget(budget: Budget): Observable<HttpResponse<Response<any>>> {
		this.url = `${environment.backendUrl}/budgets/${budget.id}`;
		return this.http.delete<Response<any>>(this.url, {
			observe: 'response',
			headers: this.configService.getHeaders,
			params: this.configParams.getConfigParams
		});
	}
}
