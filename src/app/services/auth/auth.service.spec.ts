import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientModule, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';
import { AuthService, FinerioService } from '../services.index';

import { environment } from './../../../environments/environment';
import { User } from './../../shared/dto/authLoginDot';

interface UserMock {
  email: string;
  password: string;
  id?: string;
  name?: string;
  lastName?: string;
}

describe('AuthService', () => {
  let authService: AuthService, http: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [
        AuthService,
        FinerioService
       ]
    });
    authService = TestBed.get( AuthService );
    http = TestBed.get( HttpTestingController );
  });

  afterEach( () => {
    http.verify();
  });

  it('should be created', ()  => {
    expect(authService).toBeTruthy();
  });

  describe('#loginFunction', () => {
    let expectedUser: User;
    let expectedData: any;

    beforeEach( () => {
      authService = TestBed.get( AuthService );
      expectedUser = new User( 'mock@email.com', 'passMock1.' );
    });

    it('should return 200, OK', () => {
      authService.login( expectedUser ).subscribe( data => {
        expectedData = data;
        expect(data).toEqual(expectedData);
      });
      const req = http.expectOne('https://api.finerio.mx/api/login');
      expect(req.request.method).toEqual('POST');
      console.log(req);
      expect(authService).toBeTruthy();
    });
  });
});

