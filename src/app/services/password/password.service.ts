import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PasswordResponse } from '@interfaces/passwordResponse.interface';
import { PasswordResetRequest } from '@interfaces/passwordResetRequest.interface';
import { environment } from '@env/environment';
import { ConfigService } from '@services/config/config.service';
import { Observable } from 'rxjs';

interface ValidateToken {
	email: string;
}

@Injectable({
	providedIn: 'root'
})
export class PasswordService {
	private url: string = `${environment.newBackendUrl}/password`;

	constructor(private http: HttpClient, private configService: ConfigService) {}

	createForgotPasswordToken(email: string): Observable<HttpResponse<PasswordResponse>> {
		return this.http.get<PasswordResponse>(`${this.url}/createForgotPasswordToken?email=${email}`, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}

	validateToken(token: string): Observable<HttpResponse<ValidateToken>> {
		return this.http.get<ValidateToken>(`${this.url}/getEmailAndValidateToken?token=${token}`, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}

	resetPassword(passwordReset: PasswordResetRequest): Observable<HttpResponse<PasswordResetRequest>> {
		return this.http.post<PasswordResetRequest>(`${this.url}/setNewPassword`, passwordReset, {
			observe: 'response',
			headers: this.configService.getJsonHeaders()
		});
	}
}
