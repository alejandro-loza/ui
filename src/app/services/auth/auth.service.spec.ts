import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientModule } from '@angular/common/http';
import { AuthService, FinerioService } from '../services.index';

import { User } from './../../shared/dto/authLoginDot';
import { environment } from '@env/environment';

interface UserMock {
  email: string;
  password: string;
  id?: string;
  name?: string;
  lastName?: string;
}

interface infoMock {
  info: string;
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
      const req = http.expectOne(`${environment.backendUrl}/login`);
      expect(req.request.method).toEqual('POST');
      console.log(req);
      expect(authService).toBeTruthy();
    });
  });

  describe('#personalInfoFunction', () => {
    it('should return an Observable', () => {
      const dummyInfo = {
        info: 'Dummy Info'
      };

      authService.personalInfo().subscribe( (userInfo: any) => {
        userInfo = dummyInfo;
        expect(userInfo).toEqual(dummyInfo);
      });

      const req = http.expectOne(`${environment.backendUrl}/me`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyInfo);
    });
  });
});

