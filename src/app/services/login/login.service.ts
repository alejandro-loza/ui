import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ConfigService } from '../config/config.service';
import { ToastService } from '@services/toast/toast.service';

import { User } from '@interfaces/user.interface';
import { JWT } from '@interfaces/jwt.interface';
import { environment } from '@env/environment';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private url = `${environment.backendUrl}/login`;
	private facebookUrl = `${environment.apiUrl}/facebook/login`;
	constructor(
		private httpClient: HttpClient,
		private configService: ConfigService,
		private toastService: ToastService
	) {}

	facebookLogin(email: String, token: String) {
		let url = `${this.facebookUrl}?email=${email}&token=${token}`;
		return this.httpClient.get(encodeURI(url), { headers: this.configService.getHeaders }).pipe(
			map((res: JWT) => {
				this.configService.setJWT = res;
				return res;
			}),
			catchError((error: HttpErrorResponse) => {
				this.toastService.setCode = error.status;
				this.toastService.setMessage = 'Ocurrió un error al querer ingresar.<br>Intentalo más tarde';
				this.toastService.toastGeneral();
				return throwError(error);
			})
		);
	}

	login(user: User): Observable<HttpResponse<JWT>> {
		return this.httpClient
			.post<JWT>(this.url, JSON.stringify({ username: user.email, password: user.password }), {
				observe: 'response',
				headers: this.configService.getHeaders
			})
			.pipe(
				map((res) => {
					this.configService.setJWT = res.body;
					return res;
				}),
				catchError((error: HttpErrorResponse) => {
					this.toastService.setCode = error.status;
					if (error.status === 0) {
						this.toastService.toastGeneral();
					} else if (error.status === 400) {
						this.toastService.setMessage = 'Te falto llenar un campo del formulario';
						this.toastService.toastGeneral();
					} else if (error.status === 401) {
						this.toastService.setCode = 4011;
						this.toastService.toastGeneral();
					} else if (error.status === 500) {
						this.toastService.setMessage = 'Ocurrió un error al querer ingresar.<br>Intentalo más tarde';
						this.toastService.toastGeneral();
					}
					return throwError(error);
				})
			);
	}
}
