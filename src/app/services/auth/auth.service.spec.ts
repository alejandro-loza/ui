import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { User } from './../../shared/dto/authLoginDot';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });
  });
  afterEach(inject([ HttpTestingController ], (mockBackend: HttpTestingController) => {
    mockBackend.verify();
  }));

  it('should be created',
    async(inject(
      [ HttpClientTestingModule, AuthService ],
      ( httpClientModule: HttpClientTestingModule, authService: AuthService ) => {
      expect(authService).toBeTruthy();
    }))
  );
  it('should Login_function, OK',
    async(inject([ HttpTestingController, HttpClient, AuthService ], 
      ( backend: HttpTestingController, authService: AuthService ) => {
        let userMock: User;
        userMock.username = 'mock@mock.com';
        userMock.password = 'mock123';

        authService.login(userMock)
          expect(next).toBeTruthy();

      })));
});
