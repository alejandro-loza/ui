import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from './../../../environments/environment';

import { AuthService } from './../../../app/services/auth/auth.service';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

describe('AuthServiceLogin', () => {
	beforeEach( () => {
		TestBed.configureTestingModule({
			imports:[
				HttpClientModule,
				HttpClientTestingModule
			],
			providers:[ AuthService ]
		})
	});
});

it('Everything is OK', async(
	inject(
		[ HttpClient, HttpClientModule],
		(http: HttpClient, backend: HttpClientModule) => {
			http.post(`${environment}api/login`, JSON.stringify({username: 'mock@mock.com', password: 'mock'}), httpOptions)
	})
));