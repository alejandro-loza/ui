import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { ConfigService } from '@services/config/config.service';
import { Observable } from 'rxjs';
import { Budget } from '@app/interfaces/budgets/budget.interface';
import { Response } from '@interfaces/response.interface';

@Injectable({
	providedIn: 'root'
})
export class BudgetsService {
	private url: string;

	constructor(private http: HttpClient, private configService: ConfigService) {}

	getAllBudgets(): Observable<HttpResponse<Response<Budget>>> {
		this.url = `${environment.backendUrl}/users/${sessionStorage.getItem('id-user')}/budgets/current?deep=true`;
		return this.http.get<Response<Budget>>(this.url, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}

	deleteBudget(budget: Budget): Observable<HttpResponse<Response<any>>> {
		this.url = `${environment.backendUrl}/budgets/${budget.id}?deep=true`;
		return this.http.delete<Response<any>>(this.url, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}
}
